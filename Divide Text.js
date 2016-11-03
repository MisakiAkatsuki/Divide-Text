/*
  Divide Text
    (C) あかつきみさき(みくちぃP)

  このスクリプトについて
    選択したテキストレイヤーのソーステキストを一文字ずつ新規レイヤーとして追加します.
    追加する際,半角スペースと全角スペースは無視されます.

  使用方法
    1.ファイル→スクリプト→スクリプトファイルの実行から実行.

  動作環境
    Adobe After Effects CS6以上

  ライセンス
    MIT License

  バージョン情報
    2016/11/03 Ver 1.0.0 Release
*/
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
        // テキストレイヤーを選択している場合はテキストレイヤーのみ抽出,選択していない場合は新規追加する
        if (isLayerSelected(selLayers)) {
            for (var i = 0; i < selLayers.length; i++) {
                if (selLayers[i] instanceof TextLayer) {
                    textLayers.push(selLayers[i]);
                }
            }
        }
        else {
            return 0;
        }
        var curText = "";
        for (var i = 0; i < textLayers.length; i++) {
            curText = String(textLayers[i].property(ADBE_TEXT_PROPERTIES).property(ADBE_TEXT_DOCUMENT).value);
            for (var j = 0; j < curText.length; j++) {
                if (curText[j] == "" || curText[j] == " " || curText[j] == "　") {
                    continue;
                }
                actComp.layers.addText(new TextDocument(curText[j]));
            }
        }
    };
    app.beginUndoGroup("Divide Text");
    main();
    app.endUndoGroup();
    return 0;
}).call(this);
