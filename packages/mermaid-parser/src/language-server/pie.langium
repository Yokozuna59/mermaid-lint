grammar PieChart
import './common';

entry PieChart:
    'pie' (showData?='showData')? NEWLINE*
    ('title' title=Label)? NEWLINE+
    sections+=Section*
;

Section:
    label=Label ':' value=NUMBER NEWLINE+
;

terminal Label: STRING;
