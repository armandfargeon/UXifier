grammar Uxifier
hidden(WS, SL_COMMENT, ML_COMMENT)


App:
    'app' name=ID 
        '{'
            header=Header
            theme=Theme
            menu=Menu
        '}';

Header: 
    'header' name=ID title=STRING logo=STRING level=INT;

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

WidgetClassique:
    'widgetClassique' content=STRING;

Widget:
    'widget' '{' 
        (WidgetClassique) name=ID title=STRING description=STRING 
    '}';

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
