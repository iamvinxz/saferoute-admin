const GeoJsonFetch = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/faeldon/philippines-json-maps/master/2023/geojson/municities/hires/bgysubmuns-municity-1380400000.0.1.json",
  );

  const data = await response.json();

  const tinajeros = {
    ...data,
    features: data.features.filter((f: any) =>
      f.properties.adm4_en?.toLowerCase().includes("tinajeros"),
    ),
  };

  return tinajeros;
};
export default GeoJsonFetch;
