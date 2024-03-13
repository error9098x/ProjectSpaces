%{
#include <stdio.h>

int count_digits_sum_9 = 0;

int digits_sum(char *p) {
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += p[i] - '0';   // Convert character to integer and add to sum
    }
    return sum;
}
%}

%%

\d{4}   { if (digits_sum(yytext) == 9) { count_digits_sum_9++; printf("Found a four digit number with sum of digits 9: %s\n", yytext); } }
.|\n    { /* Ignore all other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("Total number of four-digit numbers with sum of digits equal to 9: %d\n", count_digits_sum_9);
    return 0;
}

int yywrap() {
    return 1;
}
