function buildName(firstName) {
    var restName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restName[_i - 1] = arguments[_i];
    }
    return firstName + restName.join('');
}
var name = buildName("chx", "kyo1", "kyo2", "kyo3");
