/* jslint browser: true */
/* jshint globalstrict: false */
/* global WUI_ToolBar, WUI_DropDown, WUI_RangeSlider, WUI_Tabs, WUI_Dialog, WUI_CircularMenu */

// those two functions are just used to switch between bright and dark theme, found here http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none";
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none";
    var allsuspects=document.getElementsByTagName(targetelement);
    for (var i=allsuspects.length; i>=0; i--) {
    	if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        	allsuspects[i].parentNode.removeChild(allsuspects[i]);
    }
}

function createjscssfile(filename, filetype){
    if (filetype=="js") {
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css") {
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    document.head.appendChild(fileref);
    return fileref
}

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

        WUI_Dialog.setStatusBarContent("demo_centered_dialog", "You clicked the tab " + tab_id);
    };
    
    var circular_menu_item_click = function () {
    	log_output("Circular menu item clicked!");
    };

    var slider_change = function (value) {
        log_output("Slider value change: " + value);
    };
    
    var toolbar_item_toggle = function (wui_toolbar_event) {
        log_output("Toolbar item toggled, type: " + wui_toolbar_event.type + ", state: " + wui_toolbar_event.state);
    };
    
    var toolbar_item_theme_toggle = function (wui_toolbar_event) {
        log_output("Toolbar item toggled, type: " + wui_toolbar_event.type + ", state: " + wui_toolbar_event.state);
        
        if (wui_toolbar_event.id === 2) {
        	removejscssfile("wui/bright/wui.min.css", "css");
        	createjscssfile("wui/dark/wui.min.css", "css");
        } else if (wui_toolbar_event.id === 3) {
        	removejscssfile("wui/dark/wui.min.css", "css");
        	createjscssfile("wui/bright/wui.min.css", "css");
        }
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
    
    var circular_menu_items = [
        { icon: "pencil-icon",    tooltip: "first button",  on_click: circular_menu_item_click },
        { icon: "undo-icon",      tooltip: "second button", on_click: circular_menu_item_click },
        { icon: "selection-icon", tooltip: "third button",  on_click: circular_menu_item_click },
        { icon: "redo-icon",      tooltip: "fourth button", on_click: circular_menu_item_click }
    ];

    // make the circular menu also work when the dialog is detached
    var bind_contextmenu = function (win) {
        win.document.addEventListener("contextmenu", function (ev) {
            ev.preventDefault();

            WUI_CircularMenu.create({
                                        x: ev.pageX,
                                        y: ev.pageY,

                                        rx: 34,
                                        ry: 34,

                                        window: win
                                    }, circular_menu_items);
        });
    };

    bind_contextmenu(window);
    
    // setup Web MIDI so we can control some sliders with MIDI controllers
    navigator.requestMIDIAccess().then(
            function (m) {
                m.inputs.forEach(
                    function (midi_input) {
                        midi_input.onmidimessage = function (midi_message) {
                            WUI_RangeSlider.submitMIDIMessage(midi_message);
                        };
                    }
                );
        });

    WUI_Dialog.create("demo_left_dialog", {    
        title: "Widgets events output",
        width: "20%",
        height: "50%",
        halign: "left",
        valign: "center",
        closable: false,
        draggable: true,
        minimizable: true,
        resizable: true,
        status_bar: true
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
        title: "<span style=\"color: gold;\">Drag me around or resize me!</div>",
        width: "500px",
        height: "525px",
        halign: "center",
        valign: "center",
        minimizable: true,
        draggable: true,
        resizable: true,
        detachable: true,
        status_bar: true,

        status_bar_content: '<div style="font-family: Monospace; font-size: 10px; color: lightgrey; position: absolute; margin-left: 8px;">---</div><span style="font-family: Monospace; font-size: 10px; color: lightgrey;">Status bar.</span>',

        on_detach: bind_contextmenu,

        keep_align_when_resized: true
    });
    
    var demo_modal_dialog = WUI_Dialog.create("demo_modal_dialog", {
        title: "Modal dialog!",
        width: "400px",
        height: "300px",
        halign: "center",
        valign: "center",
        draggable: true,
        closable: true,
        detachable: true,

        modal: true,

        open: false
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
        top: 16
    });
    
    WUI_Dialog.create("demo_integrated_dialog_2", {    
        title: "Drag me around!",
        closable: false,
        minimizable: true,
        width: "90%",
        height: "100px",
        top: 32,
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
    
    WUI_Input.create("demo_input", {
        width: 90,
        height: 8,
            
        step: 1,
        
        bar: false,
        
        midi: {
                type: "rel"
            },
        
        default_value: 0,
            
        title: "Rel. MIDI Input (infinite)",
            
        title_min_width: 175,
        value_min_width: 48,
            
        on_change: slider_change
    });
    
    WUI_Input.create("demo_input_min_max", {
        width: 100,
        height: 8,
            
        min: 0,
        max: 360,
            
        step: 1,
        
        bar: false,
        
        midi: true,
        
        default_value: 0,
        
        title_on_top: true,
            
        title: "Abs. MIDI Input (0 : 360)",
            
        title_min_width: 175,
        value_min_width: 48,
            
        on_change: slider_change
    });
    
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
        
        configurable: {
        	min:  { min: -360, max: 360 },
        	max:  { min: -360, max: 360 },
        	step: {},
        	scroll_step: {}
        },
            
        on_change: slider_change
    });
    
    WUI_RangeSlider.create("demo_midi_slider", {
        width: 148,
        height: 8,
            
        min: 0,
        max: 360,
            
        step: 1,
        
        midi: true,
        
        default_value: 0,
            
        title: "MIDI slider (0 : 360)",
            
        title_min_width: 175,
        value_min_width: 48,
            
        on_change: slider_change
    });
    
    WUI_RangeSlider.create("demo_midi_rel_slider", {
        width: 148,
        height: 8,
            
        min: 0,
        max: 360,
            
        step: 1,
        
        midi: {
                type: "rel"
            },
        
        default_value: 0,
            
        title: "Rel. MIDI slider (0 : 360)",
            
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
        
        title: "Top title, middle slider, bottom value, configurable",
            
        title_min_width: 150,
        value_min_width: 48,
        
        configurable: {
        	min:  { min: -64, max: 64 },
        	max:  { min: -64, max: 64 },
        	step: {},
        	scroll_step: {}
        },
            
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
        
        configurable: {
        	min:  { min: -360, max: 360 },
        	max:  { min: -360, max: 360 },
        	step: {},
        	scroll_step: {}
        },
            
        on_change: slider_change
    });
    
    WUI_ToolBar.create( "demo_integrated_toolbar",
		{
				allow_groups_minimize: true,

		        item_width: 38,
		        item_height: 32,

		        icon_width: 32,
		        icon_height: 32
		},
    	{
		    first_group:    [
		        { icon: "pencil-icon", type: "toggle", toggle_group: 0, toggle_state: true, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
		        { icon: "selection-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
		        { icon: "grid-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
		    ],
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
		        { text: "Button", on_click: toolbar_item_click, tooltip: "Click me!" },
		        { text: "Toggle button", type: "toggle", on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
		    ]
        });
    
    WUI_ToolBar.create( "demo_top_toolbar",
		{
		        allow_groups_minimize: true,
		        icon_width: 32,
		        icon_height: 32
		},
    	{
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
        });

    WUI_ToolBar.create( "demo_text_toolbar",
		{
		        item_width: 38,
		        item_height: 32,

		        icon_width: 32,
		        icon_height: 32
		},
    	{
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
		        { text: "Dark theme", type: "toggle", toggle_state: true, on_click: toolbar_item_theme_toggle, toggle_group: 0, tooltip: "Toggle me!" },
		        { text: "Bright theme", type: "toggle", on_click: toolbar_item_theme_toggle, toggle_group: 0, tooltip: "Toggle me!" }
		    ]
        });
    
    WUI_ToolBar.create( "demo_vertical_toolbar",
		{
		        icon_width: 32,
		        icon_height: 32,
		        vertical: true,
		        allow_groups_minimize: true
		},
    	{
		    first_group:    [
		        { icon: "pencil-icon", type: "toggle", toggle_group: 0, toggle_state: true, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
		        { icon: "selection-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" },
		        { icon: "grid-icon", type: "toggle", toggle_group: 0, on_click: toolbar_item_toggle, tooltip: "Toggle me!" }
		    ],
		    second_group:    [
		        { icon: "undo-icon", on_click: toolbar_item_click, tooltip: "Click me!" },
		        { icon: "redo-icon", on_click: toolbar_item_click, tooltip: "Click me!" }
		    ]
        });
    
    WUI_ToolBar.create( "demo_simple_toolbar",
		{
        	item_width: 250,

        	vertical: true
        },
    	{
        	first_group:    [
		        { text: "Open center dialog (if closed)", on_click: function () { WUI_Dialog.open(demo_centered_dialog); }, tooltip: "Reopen dialog!" },
		        { text: "Open a modal dialog", on_click: function () { WUI_Dialog.open(demo_modal_dialog); }, tooltip: "Open a modal dialog" }
		    ]
        });

    document.getElementById("circular_menu_btn").addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();

        WUI_CircularMenu.create({
                                    element: ev.target,

									ry: 32
                                }, circular_menu_items);
    });
});
