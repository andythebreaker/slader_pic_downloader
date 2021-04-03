::@echo off
echo ============bat============
cp Afterburner.py tmp.py
mv tmp.py d:/andy/answer
cp *.ttf d:/andy/answer
d:
cd d:/andy/answer
mkdir %1
mv tmp.py %1
mv *.ttf %1
c:
cd %HOMEPATH%
cd Downloads
mv slader_pic_download_log*.txt d:\andy\answer
d:
cd d:\andy\answer
mv slader_pic_download_log*.txt %1
cd %1
python tmp.py
rm tmp.py
rm *.ttf