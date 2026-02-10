"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/language-context";
import {
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Loader2,
  User,
  RotateCcw,
  AlertCircle,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface Request {
  id: string;
  title: string;
  description: string;
  businessJustification: string | null;
  reason: string | null;
  status: string;
  priority: string | null;
  supportNotes: string | null;
  adminNotes: string | null;
  declineReason: string | null;
  createdAt: string;
  requestedBy: string | null;
  user: { name: string | null; email: string };
  category: { name: string; color: string } | null;
}

const priorityColors: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, { label: string; color: string }> = {
  SUBMITTED: { label: "Submitted", color: "bg-gray-100 text-gray-800" },
  UNDER_REVIEW: { label: "Under Review", color: "bg-blue-100 text-blue-800" },
  FINAL_REVIEW: { label: "Ready for Approval", color: "bg-purple-100 text-purple-800" },
  ACCEPTED: { label: "Accepted", color: "bg-green-100 text-green-800" },
  DECLINED: { label: "Declined", color: "bg-red-100 text-red-800" },
  RETURNED: { label: "Returned", color: "bg-yellow-100 text-yellow-800" },
};

export function AdminReviewList() {
  const { t, language } = useLanguage();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [supportNotes, setSupportNotes] = useState("");
  const [priority, setPriority] = useState<string>("MEDIUM");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Show all requests that are not completed
      const res = await fetch("/api/requests?status=SUBMITTED,UNDER_REVIEW,FINAL_REVIEW");
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error(language === "nl" ? "Fout bij laden verzoeken" : "Error loading requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string) => {
    if (!selectedRequest) return;
    
    // Validation
    if (action === "decline" && !declineReason.trim()) {
      toast.error(language === "nl" ? "Geef een reden voor afwijzing" : "Please provide a reason for declining");
      return;
    }

    setSubmitting(true);

    try {
      let body: any = {};
      
      // Determine action based on current status and requested action
      if (selectedRequest.status === "SUBMITTED") {
        if (action === "review") {
          body = { action: "support_review", priority, supportNotes: supportNotes || null };
        } else if (action === "submit") {
          body = { action: "submit_to_admin", priority, supportNotes: supportNotes || null };
        } else if (action === "accept") {
          body = { action: "accept", adminNotes: adminNotes || null };
        }
      } else if (selectedRequest.status === "UNDER_REVIEW") {
        if (action === "submit") {
          body = { action: "submit_to_admin", priority, supportNotes: supportNotes || null };
        } else if (action === "accept") {
          body = { action: "accept", adminNotes: adminNotes || null };
        }
      } else if (selectedRequest.status === "FINAL_REVIEW") {
        if (action === "accept") {
          body = { action: "accept", adminNotes: adminNotes || null };
        } else if (action === "decline") {
          body = { action: "decline", adminNotes: adminNotes || null, declineReason };
        } else if (action === "return") {
          body = { action: "return_to_support", adminNotes: adminNotes || null };
        }
      }

      const res = await fetch(`/api/requests/${selectedRequest.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error updating request");
      }

      // Success messages
      const messages: Record<string, string> = {
        review: language === "nl" ? "Verzoek in review genomen" : "Request taken for review",
        submit: language === "nl" ? "Verzoek ingediend voor goedkeuring" : "Request submitted for approval",
        accept: t.review?.accepted || "Request accepted",
        decline: t.review?.declined || "Request declined",
        return: t.review?.returnedToSupport || "Request returned to support",
      };
      
      toast.success(messages[action] || "Action completed");
      
      // Reset and refresh
      setSelectedRequest(null);
      setAdminNotes("");
      setDeclineReason("");
      setSupportNotes("");
      setPriority("MEDIUM");
      fetchRequests();
      
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || (language === "nl" ? "Fout bij bijwerken verzoek" : "Error updating request"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
          <p className="text-muted-foreground">All requests have been processed</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Request List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Pending Requests ({requests.length})</h2>
        {requests.map((request) => (
          <Card
            key={request.id}
            className={`cursor-pointer transition-all ${
              selectedRequest?.id === request.id
                ? "ring-2 ring-blue-500"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedRequest(request)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {request.priority && (
                      <Badge className={priorityColors[request.priority] || "bg-gray-100"}>
                        {request.priority}
                      </Badge>
                    )}
                    {statusLabels[request.status] && (
                      <Badge className={statusLabels[request.status].color}>
                        {statusLabels[request.status].label}
                      </Badge>
                    )}
                    <h3 className="font-semibold truncate">{request.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {request.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {request.user?.name || request.user?.email || "Unknown"}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Panel */}
      <div>
        {selectedRequest ? (
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedRequest.title}</span>
                {statusLabels[selectedRequest.status] && (
                  <Badge className={statusLabels[selectedRequest.status].color}>
                    {statusLabels[selectedRequest.status].label}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Description</Label>
                <p className="text-sm mt-1">{selectedRequest.description}</p>
              </div>

              {selectedRequest.businessJustification && (
                <div>
                  <Label>Business Justification</Label>
                  <p className="text-sm mt-1">{selectedRequest.businessJustification}</p>
                </div>
              )}

              {selectedRequest.supportNotes && (
                <div className="bg-amber-50 p-3 rounded-lg">
                  <Label className="text-amber-800">Support Notes</Label>
                  <p className="text-sm mt-1 text-amber-900">{selectedRequest.supportNotes}</p>
                </div>
              )}

              {/* Support Review Section */}
              {selectedRequest.status === "SUBMITTED" && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Review as Support
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Priority</Label>
                      <div className="flex gap-2 mt-1">
                        {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((p) => (
                          <Button
                            key={p}
                            type="button"
                            variant={priority === p ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPriority(p)}
                          >
                            {p}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Support Notes</Label>
                      <Textarea
                        value={supportNotes}
                        onChange={(e) => setSupportNotes(e.target.value)}
                        placeholder="Add review notes..."
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Admin Actions</h4>
                
                <div className="mb-3">
                  <Label>Admin Notes (Optional)</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes for the requester..."
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div className="mb-3">
                  <Label>Decline Reason (Required for decline)</Label>
                  <Textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Reason for declining..."
                    rows={2}
                    className="mt-1"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  {selectedRequest.status === "SUBMITTED" && (
                    <>
                      <Button
                        onClick={() => handleAction("review")}
                        disabled={submitting}
                        variant="outline"
                      >
                        {submitting ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-2" />
                        )}
                        Take for Review
                      </Button>
                      <Button
                        onClick={() => handleAction("submit")}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Submit for Approval
                      </Button>
                    </>
                  )}

                  {selectedRequest.status === "UNDER_REVIEW" && (
                    <Button
                      onClick={() => handleAction("submit")}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Submit for Final Approval
                    </Button>
                  )}

                  {(selectedRequest.status === "FINAL_REVIEW" || 
                    selectedRequest.status === "SUBMITTED" ||
                    selectedRequest.status === "UNDER_REVIEW") && (
                    <>
                      <Button
                        onClick={() => handleAction("accept")}
                        disabled={submitting}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {submitting ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Accept Request
                      </Button>
                      <Button
                        onClick={() => handleAction("decline")}
                        disabled={submitting}
                        variant="destructive"
                      >
                        {submitting ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}
                        Decline Request
                      </Button>
                    </>
                  )}

                  <Button
                    onClick={() => handleAction("return")}
                    disabled={submitting}
                    variant="outline"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <RotateCcw className="w-4 h-4 mr-2" />
                    )}
                    Return to Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a request to review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
