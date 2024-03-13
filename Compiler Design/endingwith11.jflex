import java.io.*;

%%

%class Lexer

%unicode
%public
%int
%type Reader

%function yylex
%standalone

%xstate LINE

%{

int count_ending_with_11 = 0;

%}

%%

<YYINITIAL> .*  { yybegin(LINE); yypushback(yylength()); }
<LINE> .* "11\n"  { count_ending_with_11++; System.out.println("Found a line ending with '11': " + yytext()); yybegin(YYINITIAL); }
<LINE> .|\n    { /* Ignore all other characters */ }

%%

public static void main(String[] args) throws IOException {
    Lexer scanner = new Lexer(new BufferedReader(new InputStreamReader(System.in)));
    scanner.yylex();
    System.out.println("Total number of lines ending with '11': " + scanner.count_ending_with_11);
}
