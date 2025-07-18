import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { format } from "date-fns";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Fetch all candidates with pending status
  const { data: candidates = [], isLoading,refetch } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tourguide/status");
      return res.data;
    },
  });

  // Accept candidate (update role + delete application)
  const acceptMutation = useMutation({
    mutationFn: async (candidate) => {
      await axiosSecure.patch(`/users/${candidate.email}`, {
        role: "tourguide",
      });
      await axiosSecure.patch(`/tourguide/${candidate.email}`, {
        status: "active",
      });
     
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["candidates"]);
      Swal.fire("Accepted!", "Candidate has been accepted.", "success");
      refetch();
    },
  });

  // Reject candidate (delete application only)
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/tourguide/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["candidates"]);
      Swal.fire("Rejected", "Candidate has been removed.", "info");
      refetch();
    },
  });

  const handleAccept = (candidate) => {
    Swal.fire({
      title: "Accept Candidate?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptMutation.mutate(candidate);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Candidate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-[#1f2937] rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Manage Tour Guide Applications
      </h2>

      {isLoading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : candidates.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, index) => (
                <tr key={c._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={c.photo}
                      alt="candidate"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="font-medium">{c.name}</td>
                  <td>{c.email}</td>
                  <td className="text-blue-500">User</td>
                  <td className="text-yellow-600 font-semibold">{c.status}</td>
                  <td>{format(new Date(c.submittedAt), "PPP")}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => setSelectedCandidate(c)}
                    >
                      Show Details
                    </button>
                    <button
                      className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                      onClick={() => handleAccept(c)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleReject(c._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedCandidate && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle"
          onClose={() => setSelectedCandidate(null)}
        >
          <div className="modal-box bg-white dark:bg-gray-800 dark:text-white">
            <h3 className="font-bold text-lg">Candidate Details</h3>
            <div className="mt-3 space-y-2">
              <img
                src={selectedCandidate.photo}
                alt="profile"
                className="w-20 h-20 rounded-full border"
              />
              <p>
                <strong>Name:</strong> {selectedCandidate.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedCandidate.email}
              </p>
              <p>
                <strong>Title:</strong> {selectedCandidate.title}
              </p>
              <p>
                <strong>Reason:</strong> {selectedCandidate.reason}
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {format(new Date(selectedCandidate.submittedAt), "PPPp")}
              </p>
              <p>
                <strong>CV:</strong>{" "}
                <a
                  href={selectedCandidate.cvLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View CV
                </a>
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="btn btn-sm bg-gray-500 text-white hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCandidates;
