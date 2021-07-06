javascript: ( /* add Friends */
  () => {
    (async () => {
      var num = prompt("Nhập Số Lượng", "");
      var delayTime = prompt("Nhập delay", "");
      var j = 0;
      delayTime = delayTime && !isNaN(delayTime) ? delayTime * 1000 : 0;
      if (!(num & num.trim() && !isNaN(num) && num > 0)) return 0;
      var ip = await selectAddElement();
      console.log(ip);
      for (i = 0; i < ip.length; i++) {
        await new Promise(r => setTimeout(r, delayTime / 2));
        if (!isInNeedView(ip[i])) ip[i].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        ip[i].click();
        await new Promise(r => setTimeout(r, delayTime / 2));

        if (i == ip.length - 1) {
          ip = await selectAddElement();
          i = 0;
        }

        j++; if (j == num) break;
      }
    })();

    async function selectAddElement(y = 0){
      var x = document.querySelectorAll('div[aria-label="Thêm bạn bè"]');
      if(x.length = 0 && y < 3){ 
        objectSelector.scrollTo({ top: objectSelector.scrollHeight, behavior: 'smooth'});
        await new Promise(r => setTimeout(r, 3000));
        selectAddElement(y + 1);
      } 
      else return x;
    }

    function isInNeedView(element) {
      const rect = element.getBoundingClientRect();
      var x = (rect.left + rect.right) / 2, y = (rect.top + rect.bottom) / 2;
      return 0 <= x && 0 <= y && y <=  window.innerHeight * 2 / 3;
    }
  })();
