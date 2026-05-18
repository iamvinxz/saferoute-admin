import { useState } from "react";
import { getDepthColors } from "@/lib/colorHelper";
import { edit, loading, search, x } from "@/lib/icon";
import {
  useDeletePinMutation,
  useDeleteSegmentMutation,
  useGetAllPinQuery,
  useGetAllSegmentQuery,
} from "@/Redux/Services/markService";
import { toast } from "sonner";

type Props = {
  onFocus: (target: { lat: number; lng: number }) => void;
};

const ViewMarkedLocations = ({ onFocus }: Props) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  //rtk query
  const { data: floodedStreet, isLoading: isFloodedStreetLoading } =
    useGetAllSegmentQuery();
  const { data: pinnedLocations, isLoading: isPinnedLocationLoading } =
    useGetAllPinQuery();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteSegment] = useDeleteSegmentMutation();
  const [deletePin] = useDeletePinMutation();

  //handlers
  const handleDeleteSegment = async (id: string) => {
    try {
      setDeleteId(id);
      await deleteSegment({ id }).unwrap();
      toast.success("Segment deleted successfully", {
        style: { background: "#61b728", color: "white" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeletePin = async (id: string) => {
    try {
      setDeleteId(id);
      await deletePin({ id }).unwrap();
      toast.success("Pinned location deleted successfully", {
        style: { background: "#61b728", color: "white" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="bg-white shadow-md absolute top-17 right-5 z-400 rounded-md w-90 max-w-120 h-130 px-3 pb-3 overflow-y-auto lg:min-w-100">
      <div className="text-sm sticky top-0 bg-white pt-3 pl-2 pb-2 select-none flex flex-col gap-2">
        <span className="text-[#464646] font-semibold text-[15px]">
          Flooded Street
        </span>
        <div className="flex items-center">
          <input
            className="h-9 pl-8 pr-3 text-xs text-[#797878] border border-gray-200 rounded-sm w-full focus:outline-none"
            placeholder="Search flooded street"
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
          <span
            dangerouslySetInnerHTML={{ __html: search }}
            className="absolute pl-2"
          />
        </div>
        <div className="flex items-center-safe justify-center gap-4">
          <div
            className={`py-2 px-3 w-1/2 rounded-sm hover:cursor-pointer ${isActive ? `bg-[#3689e7]` : `bg-[#cacaca]`} `}
            onClick={() => setIsActive(true)}
          >
            <p className="text-white text-xs text-center">Flooded Streets</p>
          </div>
          <div
            className={`py-2 px-3 w-1/2 rounded-sm hover:cursor-pointer ${!isActive ? `bg-[#3689e7]` : `bg-[#cacaca]`} `}
            onClick={() => setIsActive(false)}
          >
            <p className="text-white text-xs text-center">Pinned Locations</p>
          </div>
        </div>
      </div>
      {isActive
        ? floodedStreet?.segments.map((street, _index) => {
            const middleCoordinate = Math.trunc(street.coords.length / 2); //get the middle coordinate
            return (
              <div
                key={street._id}
                className="border-t border-gray-200 px-3 py-2 w-full overflow-y-hidden select-none hover:bg-gray-100"
                onClick={() =>
                  onFocus({
                    lat: street.coords[middleCoordinate][0],
                    lng: street.coords[middleCoordinate][1],
                  })
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="font-medium text-sm text-[#303030]">
                      {street.floodReport.streetName}
                    </p>
                    <span
                      className={`inline-block capitalize text-xs font-medium px-1.5 py-0.5 rounded-full border                            
                          ${getDepthColors(street.floodReport.floodDepth).badge}
                          ${getDepthColors(street.floodReport.floodDepth).text}
                        `}
                    >
                      {street.floodReport.floodDepth}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: deleteId === street._id ? loading : x,
                      }}
                      className="hover:cursor-pointer"
                      onClick={() => handleDeleteSegment(street._id)}
                    />
                  </div>
                </div>

                <p className="text-xs text-[#797878] leading-tight mt-2 mb-1 w-63">
                  {street.floodReport.description}
                </p>
                <div>
                  <span className="text-xs text-[#797878]">
                    {new Date(street.floodReport.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}
                  </span>
                </div>
              </div>
            );
          })
        : pinnedLocations?.pins.map((pin, index) => (
            <div
              key={pin._id}
              className="border-t border-gray-200 px-3 py-2 w-full overflow-y-hidden select-none hover:bg-gray-100"
              onClick={() =>
                onFocus({
                  lat: pin.coords[0],
                  lng: pin.coords[1],
                })
              }
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm text-[#303030]">
                  {pin.pinName}
                </p>
                <div className="flex items-center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: deleteId === pin._id ? loading : x,
                    }}
                    className="hover:cursor-pointer"
                    onClick={() => handleDeletePin(pin._id)}
                  />
                </div>
              </div>

              <span className="text-xs text-[#797878]">{pin.description}</span>
              <div>
                <span className="text-xs text-[#797878]">
                  {new Date(pin.createdAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ViewMarkedLocations;
