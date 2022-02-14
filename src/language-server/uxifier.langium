grammar Uxifier
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'app' name=ID 
        '{'
            theme=Theme
            header=Header
            menu=Menu
        '}';
Theme:
    'theme' name=ID 
        '{'
            'colors{' 
                colors+=Color
                (colors+=Color)*
            '}'
        '}';

Color:
    'color' name=ID 'code' code=STRING;

Header: 
    'header' name=ID 'title' title=STRING 'logo' logo=STRING 'level' level=INT;    

WidgetClassique:
    'widgetClassique' name=ID 'title' title=STRING "icon" icon=STRING 'value' value=INT;

// Widget:
//     'widget' '{' 
//         (WidgetClassique) name=ID title=STRING description=STRING 
//     '}';

Widget: 
    (WidgetClassique);

WidgetWrapper:
    'widgetWrapper' name=ID "width" width=INT '{' 
        widgets+=Widget 
    '}';

Page:
    'page' name=ID title=STRING '{' 
        widgetWrappers+=WidgetWrapper 
    '}';

Menu:
    'menu' name=ID '{' 
        (pages+=Page)* 
    '}';

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;

terminal URL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
