/* jslint browser: true */
/* jshint globalstrict: false */
/* global WUI_ToolBar, WUI_DropDown, WUI_RangeSlider, WUI_Tabs, WUI_Dialog */

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    
    var log_output = function (text) {
        var demo_widget_output = document.getElementById("demo_widget_output"),
        
            output_node = document.createElement("div");
        
        output_node.innerHTML = text;
        
        demo_widget_output.appendChild(output_node);
        
        demo_widget_output.scrollTop = demo_widget_output.scrollHeight;
    };
    
    var tab_clicked = function (tab_id) {
        log_output("You clicked the tab " + tab_id);
    };
    
    var slider_change = function (value) {
        log_output("Slider value change: " + value);
    };
    
    var toolbar_item_toggle = function (wui_toolbar_event) {
        log_output("Toolbar item toggled, type: " + wui_toolbar_event.type + ", state: " + wui_toolbar_event.state);
    };
    
    var toolbar_item_click = function () {
        log_output("Toolbar item clicked!");
    };
    
    var toolbar_dd_item_click = function () {
    	log_output("Toolbar dropdown item clicked!");
    };

    var dropdown_item_selected = function (item_index) {
        log_output("Dropdown item " + item_index + " selected");
    };
    
    WUI_Dialog.create("demo_left_dialog", {    
        title: "Widgets events output",
        width: "20%",
        height: "50%",
        halign: "left",
        valign: "center",
        closable: false,
        draggable: true,
        minimizable: true
    });
    
    WUI_Dialog.create("demo_right_dialog", {    
        title: "halign: \"right\"",
        width: "20%",
        height: "25%",
        halign: "right",
        valign: "center",
        closable: false,
        draggable: true,
        minimizable: true
    });
    
    var demo_centered_dialog = WUI_Dialog.create("demo_centered_dialog", {    
        title: "<span style=\"color: gold;\">Drag me around!</div>",
        width: "500px",
        height: "500px",
        halign: "center",
        valign: "center",
        minimizable: true,
        draggable: true
    });
    
    WUI_Dialog.create("demo_bottom_dialog", {    
        title: "closable: false, draggable: false, minimizable: false",
        width: "50%",
        height: "15%",
        halign: "center",
        valign: "bottom",
        closable: false
    });
    
    WUI_Dialog.create("demo_integrated_dialog", {    
        title: "WUI widgets demo page",
        closable: false,
        minimizable: true,
        width: "90%",
        height: "280px",
        top: "16px"
    });
    
    WUI_Dialog.create("demo_integrated_dialog_2", {    
        title: "Drag me around!",
        closable: false,
        minimizable: true,
        width: "90%",
        height: "100px",
        top: "32px",
        draggable: true
    });
    
    WUI_Tabs.create("demo_tabs", {
        on_tab_click: tab_clicked
    });
    
    WUI_DropDown.create( "demo_horizontal_dropdown", {
            width: "100px",

            vspacing: 4,

            ms_before_hiding: 1000,

            selected_id: 0,

            vertical: false,

            on_item_selected: dropdown_item_selected
        },
        ["First item", "Second item", "Third item"]
    );
    
    WUI_DropDown.create( "demo_vertical_dropdown", {
            width: "auto",

            vspacing: -60,

            ms_before_hiding: 1000,

            selected_id: 0,

            vertical: true,

            on_item_selected: dropdown_item_selected
        },
        ["First item", "Second item", "Third item"]
    );
    
    WUI_RangeSlider.create("demo_slider", {
        width: 148,
        height: 8,
            
        min: 0,
        max: 360,
            
        step: 1,
        
        default_value: 0,
            
        title: "Classic slider (0 : 360)",
            
        title_min_width: 175,
        value_min_width: 48,
            
        on_change: slider_change
    });

    WUI_RangeSlider.create("demo_slider_negative", {
        width: 148,
        height: 8,
            
        min: -32,
        max: 32,
            
        step: 0.5,
            
        default_value: 0,
            
        title: "Negative (-32 : +32)",
            
        title_min_width: 175,
        value_min_width: 48,
            
        on_change: slider_change
    });
    
    WUI_RangeSlider.create("demo_slider_top_text", {
        width: 300,
        height: 8,
            
        min: 0,
        max: 64,
            
        step: 1,
        
        default_value: 32,
            
        title_on_top: true,
        
        title: "Top title, long middle slider and value at the bottom",
            
        title_min_width: 150,
        value_min_width: 48,
            
        on_change: slider_change
    });
    
    WUI_RangeSlider.create("demo_vertical_slider", {
        width: 8,
        height: 130,
            
        min: 0,
        max: 360,
            
        step: 1,
        
        vertical: true,
            
        default_value: 0,
            
        title: "Vertical slider",
        
        title_min_width: 100,
            
        on_change: slider_change
    });
    
    WUI_ToolBar.create( "demo_top_toolbar", {  
        first_group:    [
            { icon: "pencil-icon", type: "toggle", toggle_group: 0, toggle_state: true, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
            { icon: "selection-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
            { icon: "grid-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
        ],
        second_group:    [
            { icon: "undo-icon", on_click: toolbar_item_click, tooltip: "Click me!" },
            { icon: "redo-icon", on_click: toolbar_item_click, tooltip: "Click me!" }
        ],
        third_group:    [
            { icon: "back-icon", on_click: toolbar_item_click, tooltip: "Click me!" },
            { icon: "forw-icon", on_click: toolbar_item_click, tooltip: "Click me!" },
            { icon: "play-icon", type: "toggle", on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
            { icon: "record-icon", type: "toggle", on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
        ]
        }, {
            allow_groups_minimize: true,
            icon_width: 32,
            icon_height: 32
    });
    
    WUI_ToolBar.create( "demo_text_toolbar", {  
        icons_group: [
            {
            	icon: "pencil-icon",
            	text: "Menu",
            	type: "dropdown",
            	items: [
       				{ title: "First item",  on_click: toolbar_dd_item_click },
       				{ title: "Second item", on_click: toolbar_dd_item_click },
       				{ title: "Third item",  on_click: toolbar_dd_item_click }],
       			tooltip: "Click me!" }
        ],
        text_group: [
            { text: "Textual", on_click: toolbar_item_click, tooltip: "Click me!" },
            { text: "Toolbar", type: "toggle", on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
            { text: "Group", type: "toggle", on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
        ]
        }, {
            item_width: 38,
            item_height: 32,

            icon_width: 32,
            icon_height: 32
    });
    
    WUI_ToolBar.create( "demo_vertical_toolbar", {  
        first_group:    [
            { icon: "pencil-icon", type: "toggle", toggle_group: 0, toggle_state: true, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
            { icon: "selection-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
            { icon: "grid-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
        ],
        second_group:    [
            { icon: "undo-icon", on_click: toolbar_item_click, tooltip: "Click me!" },
            { icon: "redo-icon", on_click: toolbar_item_click, tooltip: "Click me!" }
        ]
        }, {
            icon_width: 32,
            icon_height: 32,
            vertical: true,
            allow_groups_minimize: true
    });
    
    WUI_ToolBar.create( "demo_simple_toolbar", {  
        first_group:    [
            { text: "Open center dialog (if closed)", on_click: function () { WUI_Dialog.open(demo_centered_dialog); }, tooltip: "Reopen dialog!" }
        ]
        });
});
