/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>
(function () {
    var ADBE_TEXT_PROPERTIES = "ADBE Text Properties";
    var ADBE_TEXT_DOCUMENT = "ADBE Text Document";
    var isCompActive = function (comp) {
        if (!(comp && comp instanceof CompItem)) {
            return false;
        }
        else {
            return true;
        }
    };
    var isLayerSelected = function (layers) {
        if (layers.length === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    var main = function () {
        var actComp = app.project.activeItem;
        if (!isCompActive(actComp)) {
            return 0;
        }
        var selLayers = actComp.selectedLayers;
        var textLayers = [];
        if (!isLayerSelected(selLayers)) {
            return 0;
        }
        // テキストレイヤーを選択している場合はテキストレイヤーのみ抽出,選択していない場合は新規追加する
        for (var i = 0; i < selLayers.length; i++) {
            if (selLayers[i] instanceof TextLayer) {
                textLayers.push(selLayers[i]);
            }
        }
        var curText = "";
        for (var i = 0; i < textLayers.length; i++) {
            curText = String(textLayers[i].property(ADBE_TEXT_PROPERTIES).property(ADBE_TEXT_DOCUMENT).value);
            if (curText.length == 1) {
                continue;
            }
            for (var j = 0; j < curText.length; j++) {
                if (curText[j] == "" || curText[j] == " " || curText[j] == "　") {
                    continue;
                }
                actComp.layers.addText(new TextDocument(curText[j]));
            }
        }
        return 0;
    };
    app.beginUndoGroup("Divide Text");
    main();
    app.endUndoGroup();
    return 0;
}).call(this);
