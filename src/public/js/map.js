/*eslint-disable*/

export const displayMap = (locations) => {
  maptilersdk.config.apiKey = 'fg20SJA60q3aBa9vCkZv';
  const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element to render the map
    style: 'bright-v2',
    scrollZoom: false,
  });

  const bounds = new maptilersdk.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    new maptilersdk.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new maptilersdk.Popup({
      offset: 30,
      focusAfterOpen: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  setTimeout(() => {
    map.fitBounds(bounds, {
      padding: { top: 200, bottom: 150, left: 100, right: 100 },
    });
  }, 1000);
};
