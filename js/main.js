"use strict";

{

  //formに入力した内容を未完了のTODOに追加する
  const onClickAdd = () => {
    //入力したテキストを取得し、formを初期化する
    const inputText = document.getElementById("add-text").value;
    if(inputText === "") {
      return alert("TODOを入力してください");
    }
    document.getElementById("add-text").value = "";
    createIncompleteList(inputText);
  };

  //未完了リストから指定の要素を削除
  const deleteFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
  };
  
  //未完了リストにリストを追加する関数
  const createIncompleteList = (text) => {
    //div生成
    const div = document.createElement("div");
    div.className = "list-row";
    //liタグを生成し、引数textを格納
    const li = document.createElement("li");
    li.innerText = text;
    //button(完了)要素の作成
    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    //button(削除)要素の作成
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    //divタグの子要素にli要素・button(完了)・button(削除)を格納
    div.appendChild(li);
    div.appendChild(completeButton);
    div.appendChild(deleteButton);
    //未完了リストに追加
    document.getElementById("incomplete-list").appendChild(div);

    completeButton.addEventListener("click" , () => {
      //押されたボタンの親タグを削除(レキシカルスコープを参照し、2段外の関数を取得)
      deleteFromIncompleteList(completeButton.parentNode);

      //TODO内容を取得
      const addTarget = completeButton.parentNode;
      const text = addTarget.firstElementChild.innerText;

      //div以下を初期化
      addTarget.textContent = null;

      //liタグを生成し、textを格納する
      const li = document.createElement("li");
      li.innerText = text;

      //button(戻す)要素の生成
      const backButton = document.createElement("button");
      backButton.innerText = "戻す";
      
      //divタグの子要素に各要素を追加
      addTarget.appendChild(li);
      addTarget.appendChild(backButton);

      //完了リストに追加
      document.getElementById("complete-list").appendChild(addTarget);

      backButton.addEventListener("click" , () => {
        //押されたボタンの親タグを完了リストから削除する
        const deleteTarget = backButton.parentNode;
        document.getElementById("complete-list").removeChild(deleteTarget);

        //テキストを取得
        const text = deleteTarget.firstElementChild.innerText;
        //取得したテキストを未完了リストに追加する
        createIncompleteList(text);
      });  
    });
    
    deleteButton.addEventListener("click" , () => {
      //押されたボタンの親タグ(div)の削除
      deleteFromIncompleteList(deleteButton.parentNode);
    });

  };


  document.getElementById("add-button").addEventListener("click" , (e) => {
    e.preventDefault();
    onClickAdd();
  });
}