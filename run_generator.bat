@ echo off
rem 查找main.js存不存在
if exist  E:\cocosProject\good_Project2\build\jsb-link\main.js (
   del  E:\cocosProject\good_Project2\build\jsb-link\main.js
)else (
echo main.js dose not exist
)

if exist  E:\cocosProject\good_Project2\main.js  (
   copy  E:\cocosProject\good_Project2\main.js E:\cocosProject\good_Project2\build\jsb-link
)else (
echo  good_Project2\main.js dose not exist
)
rem 调用js脚本
node E:/cocosProject/good_Project2/version_generator.js 
pause