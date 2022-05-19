import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js";

import testPlugin from "../grapesJsPlugins/testplugin";

const initWebEditor = () => {
  const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: "#gjs",
    styleManager: { sectors: [] },
    // selectorManager: { componentFirst: true },
    plugins: ["gjs-preset-webpage", testPlugin],
    pluginsOpts: {
      "gjs-preset-webpage": {
       
      },
    },
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: false,
    //components: route.template.components || route.template.html,
    //style: route.template.style || route.template.css,
    // allowScripts: 1,
    avoidInlineStyle: true,
    // Size of the editor
    //height: "300px",
    width: "auto",
    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      ],
    },
    // Disable the storage manager for the moment
    storageManager: false,
    /*storageManager: {
        id: "gjs-", // Prefix identifier that will be used inside storing and loading
        type: "local", // Type of the storage
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
        storeComponents: true, // Enable/Disable storing of components in JSON format
        storeStyles: true, // Enable/Disable storing of rules in JSON format
        storeHtml: true, // Enable/Disable storing of components as HTML string
        storeCss: true, // Enable/Disable storing of rules as CSS string
      },*/
  });

  editor.Panels.addButton("options", [
    {
      id: "save-canvas-to-server",
      className: "btn-show-json",
      label: "save template to server",
      context: "save-template-to-server",
      command(editor) {
        const obj = {
          action: "saveTemplate",
          payload: {
            //id: route.id,
            //url: route.url,
            //tag: route.tag,
            template: {
              html: editor.getHtml(),
              css: editor.getCss(),
              components: editor.getComponents(),
              style: editor.getStyle(),
            },
          },
        };

        //send data to a server instead of console log for real save
        console.log(JSON.stringify(obj));
      },
    },
  ]);

  /*if (route.template.style === null)
    editor.addStyle(
      ".quote{ color:#777; font-weight: 300; padding: 10px; box-shadow: -5px 0 0 0 #ccc; font-style: italic; margin: 20px 30px; }"
    );*/

  editButtons(editor);

  return editor;
};

function editButtons(editor) {
  // add tooltips to buttons and modify clear canvas command
  const pn = editor.Panels;
  const cmdm = editor.Commands;
  [
    ["sw-visibility", "Show Borders"],
    ["preview", "Preview"],
    ["fullscreen", "Fullscreen"],
    ["export-template", "Export"],
    ["undo", "Undo"],
    ["redo", "Redo"],
    ["gjs-open-import-webpage", "Import"],
    ["canvas-clear", "Clear canvas"],
    ["save-canvas-to-server", "sauve le template"],
  ].forEach(function (item) {
    pn.getButton("options", item[0]).set("attributes", {
      title: item[1],
      "data-tooltip-pos": "bottom",
    });
  });

  [
    ["set-device-desktop", "desktop"],
    ["set-device-tablet", "tablet"],
    ["set-device-mobile", "mobile"],
  ].forEach(function (item) {
    pn.getButton("devices-c", item[0]).set("attributes", {
      title: item[1],
      "data-tooltip-pos": "bottom",
    });
  });

  cmdm.add("canvas-clear", function () {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Etes vous sûr de vouloir vider le canvas ?")) {
      var comps = editor.DomComponents.clear();
      // setTimeout(function(){ localStorage.clear()}, 0)
    }
  });
}

export { initWebEditor };
