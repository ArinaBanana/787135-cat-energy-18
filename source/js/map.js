ymaps.ready(init);

function getIconSize() {
  var windowWidth = document.body.clientWidth;
  if (windowWidth < 768) {
    return [55, 53]
  } else {
    return [113, 106]
  }
}

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [59.9388562, 30.3232834],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 17
  });


  var placemark = new ymaps.Placemark([59.9388562, 30.3232834], {}, { // координаты метки
    iconLayout: "default#image",
    iconImageHref: "img/map-pin.png", // иконка метки
    iconImageSize: getIconSize() // размер метки
  });

  myMap.geoObjects.add(placemark);

  window.addEventListener('resize', function () {
    var newSize = getIconSize();
    var oldSize = placemark.options.get('iconImageSize');
    if (newSize[0] !== oldSize[0] && newSize[1] !== oldSize[1]) {
      placemark.options.set('iconImageSize', newSize);
    }
  })
}
