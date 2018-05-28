<?php
$str = "<pre>学习php是一件快乐的事。</pre><pre>所有的phper需要共同努力！</pre>";
$kw = "php";
preg_match_all('/<pre>([\s\S]*?)<\/pre>/',$str,$mat);
var_dump($mat[0]);
echo "<br>";
var_dump($mat[1][0]);
echo "<br>";
var_dump($mat[1][1]);
echo "<br>";	
for($i=0;$i<count($mat[0]);$i++){
    $mat[0][$i] = $mat[1][$i];
    $mat[0][$i] = str_replace($kw, '<span style="color:#ff0000">'.$kw.'</span>', $mat[0][$i]);
    echo $mat[0][$i];
    echo "<br>";
    $str = str_replace($mat[1][$i], $mat[0][$i], $str);
}
echo $str;
?>