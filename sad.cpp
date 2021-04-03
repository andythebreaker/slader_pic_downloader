#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <fstream>
#include <algorithm>
#include <regex>
using namespace std;
int main()
{
    cout << "====================after burner====================" << endl;
    cout << "input dir name:";
    string loc = "";
    cin >> loc;
    string lp = "do.bat ";
    string llp = lp + loc;
    system(llp.c_str());
}