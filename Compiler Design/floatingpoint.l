%{
#include <stdio.h>

int count = 0;
%}

%%

[0-9]*"."[0-9]+ { count++; printf("Found a floating point number: %s\n", yytext); }
.|\n { /* Ignore all other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("Total number of floating point numbers: %d\n", count);
    return 0;
}

int yywrap() {
    return 1;
}
