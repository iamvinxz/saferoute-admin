import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { getDepthColors, getStatusColors } from "@/lib/colorHelper";

interface SosSignalProps {
  search: string;
}

const SOSsignalTable = ({ search }: SosSignalProps) => {
  //rtk
  const { data: sosAlertsResponse, isLoading: alertsLoading } =
    useGetAllSosAlertQuery();

  //handlers
  const filteredSosSignals = sosAlertsResponse?.alerts.filter(
    (alert) =>
      alert.streetName.toLowerCase().includes(search.toLowerCase()) ||
      alert.condition.toLowerCase().includes(search.toLowerCase()) ||
      alert.status.toLowerCase().includes(search.toLowerCase()),
  );

  console.log("here", sosAlertsResponse);

  return (
    <div className="bg-white border border-slate-100 rounded-md shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              No.
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Street name
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Condition
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Number of Person
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Requested Time
            </th>
          </tr>
        </thead>
        <tbody>
          {alertsLoading ? (
            [...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-4 bg-slate-200 rounded" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-20 bg-slate-200 rounded-md" />
                </td>
              </tr>
            ))
          ) : filteredSosSignals?.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-8 text-center text-sm text-[#848484]"
              >
                No reports found.
              </td>
            </tr>
          ) : (
            filteredSosSignals?.map((alert, index) => (
              <tr key={alert._id} className="hover:bg-[#f1f5f9]">
                <td className="px-5 py-4 text-[#585858]">{index + 1}</td>
                <td className="px-5 py-4 text-[#585858]">{alert._id}</td>
                <td className="px-5 py-4 text-[#585858]">{alert.streetName}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                    ${getDepthColors(alert.condition).badge} 
                    ${getDepthColors(alert.condition).text}`}
                  >
                    {alert.condition}
                  </span>
                </td>

                <td className="px-5 py-4 text-[#585858]">
                  {alert.numberOfPersons}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                      ${getStatusColors(alert.status.toLowerCase()).badge} 
                      ${getStatusColors(alert.status.toLowerCase()).text}`}
                  >
                    {alert.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#585858]">
                  {new Date(alert.createdAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SOSsignalTable;
