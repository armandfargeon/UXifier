grammar Uxifier
hidden(WS, SL_COMMENT, ML_COMMENT)


App:
    'app' name=ID 
        '{'
            header=Header
            theme=Theme
        '}';

Header: 
    'header' name=ID title=STRING logo=STRING level=INT;

Page: 
    'page' title=STRING onglet=STRING;

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


terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
