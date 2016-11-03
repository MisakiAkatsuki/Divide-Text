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
    2016/11/03 Ver 1.0.1 Update
      テキストが一文字の時,処理を飛ばすようにした.

    2016/11/03 Ver 1.0.0 Release
*/

/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>

(function () {
  const ADBE_TEXT_PROPERTIES: string = "ADBE Text Properties";
  const ADBE_TEXT_DOCUMENT: string = "ADBE Text Document";

  const isCompActive = function (comp: CompItem) {
    if (!(comp && comp instanceof CompItem)) {
      return false;
    } else {
      return true;
    }
  }

  const isLayerSelected = function (layers: Layer[]) {
    if (layers.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const main = function () {
    const actComp: CompItem = <CompItem>app.project.activeItem;
    if (!isCompActive(actComp)) {
      return 0;
    }

    const selLayers: Layer[] = <Layer[]>actComp.selectedLayers;
    let textLayers: TextLayer[] = [];

    // テキストレイヤーを選択している場合はテキストレイヤーのみ抽出,選択していない場合は新規追加する
    if (isLayerSelected(selLayers)) {
      for (let i = 0; i < selLayers.length; i++) {
        if (selLayers[i] instanceof TextLayer) {
          textLayers.push(<TextLayer>selLayers[i]);
        }
      }
    } else {
      return 0;
    }

    let curText: string = "";

    for (let i = 0; i < textLayers.length; i++) {
      curText = String(textLayers[i].property(ADBE_TEXT_PROPERTIES).property(ADBE_TEXT_DOCUMENT).value);
      if(curText.length == 1){
        continue;
      }

      for (let j = 0; j < curText.length; j++) {
        if (curText[j] == "" || curText[j] == " " || curText[j] == "　") {
          continue;
        }
        actComp.layers.addText(new TextDocument(curText[j]));
      }
    }
  }

  app.beginUndoGroup("Divide Text");
  main();
  app.endUndoGroup();

  return 0;
}).call(this);
