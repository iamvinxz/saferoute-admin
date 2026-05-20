import { api } from "./APIService";

export const mapsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGeoJson: builder.query<any, void>({
      queryFn: async () => {
        try {
          const url = process.env.NEXT_PUBLIC_GEOJSON_URI;
          if (!url)
            return {
              error: {
                status: "FETCH_ERROR",
                error: "GeoJSON URL is not defined!",
              },
            };

          const response = await fetch(url);
          const data = await response.json();

          const tinajeros = {
            ...data,
            features: data.features.filter((f: any) =>
              f.properties.adm4_en?.toLowerCase().includes("tinajeros"),
            ),
          };

          return { data: tinajeros };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetGeoJsonQuery } = mapsApi;
