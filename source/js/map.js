ymaps.ready(init);

function getIconSize() {
  var windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return [55, 53]
  } else {
    return [113, 106]
  }
}

function getCenterPosition() {
  var windowWidth = window.innerWidth;
  if (windowWidth < 1300) {
    return [59.9388562, 30.3232834]
  } else {
    return [59.9387165, 30.3208587]
  }
}

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true
}

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: getCenterPosition(),
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
    if (!compareArrays(newSize, oldSize)) {
      placemark.options.set('iconImageSize', newSize);
    }
  });

  window.addEventListener('resize', function () {
    var newCenter = getCenterPosition();
    var oldCenter = myMap.getCenter();

    if (!compareArrays(newCenter, oldCenter)) {
      myMap.setCenter(newCenter);
    }
  });

}
