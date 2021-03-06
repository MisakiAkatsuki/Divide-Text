/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>

(function () {
  const ADBE_TEXT_PROPERTIES: string = "ADBE Text Properties";
  const ADBE_TEXT_DOCUMENT: string = "ADBE Text Document";

  const isCompActive = function (comp: CompItem): boolean {
    if (!(comp && comp instanceof CompItem)) {
      return false;
    } else {
      return true;
    }
  }

  const isLayerSelected = function (layers: Layer[]): boolean {
    if (layers.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const main = function (): number {
    const actComp: CompItem = <CompItem>app.project.activeItem;
    if (!isCompActive(actComp)) {
      return 0;
    }

    const selLayers: Layer[] = <Layer[]>actComp.selectedLayers;
    let textLayers: TextLayer[] = [];

    if (!isLayerSelected(selLayers)) {
      return 0;
    }

    // テキストレイヤーを選択している場合はテキストレイヤーのみ抽出,選択していない場合は新規追加する
    for (let i = 0; i < selLayers.length; i++) {
      if (selLayers[i] instanceof TextLayer) {
        textLayers.push(<TextLayer>selLayers[i]);
      }
    }

    let curText: string = "";
    for (let i = 0; i < textLayers.length; i++) {
      curText = String(textLayers[i].property(ADBE_TEXT_PROPERTIES).property(ADBE_TEXT_DOCUMENT).value);
      if (curText.length == 1) {
        continue;
      }

      for (let j = 0; j < curText.length; j++) {
        if (curText[j] == "" || curText[j] == " " || curText[j] == "　") {
          continue;
        }

        actComp.layers.addText(new TextDocument(curText[j]));
      }
    }

    return 0;
  }

  app.beginUndoGroup("Divide Text");
  main();
  app.endUndoGroup();

  return 0;
}).call(this);
