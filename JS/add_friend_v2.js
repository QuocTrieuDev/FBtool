javascript: (
	/** 	Auto add friend FB
	 * URL: https://www.facebook.com/friends
	 * lang: vi
	 * ================================================================
	 * © 2021 ‧ QuocTrieuDev
	 */
	() => {
		(async () => { /** Main */
			console.log("QuocTrieuDev");
			var amount = xinput("Nhập số lượng bạn cần add:\n(Số > 0, Mặc định: 150)", [0, 150], x => !isNaN(x) && x > 0),
				delay = xinput("Nhập delay time:\n(Số > 0, ngăn cách bởi dấu phẩy, Mặc định: 3, 5)", [0, "3, 5"], x => {
					return (isNaN(x) && x.split(",").filter(y => !isNaN(y) && y >= 0).length > 1) || !isNaN(x)
				}),
				count = 0,
				err = 0;

			if (!amount || !delay) return 0;
			delay = delay.split(",").filter(y => !isNaN(y) && y >= 0);
			console.log({ Sl: amount, Delay: delay });
			while (count < amount) {
				var a = eselect('div[aria-label="Thêm bạn bè"]');
				if (a.length == 0) {
					if (err > 4) break;
					if (err > 0) console.log("Tried: " + err);
					window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
					await delayInS(err++, 1);
					continue;
				} else err = 0;
				console.log("Found: " + a.length);
				for (var i = 0; i < a.length; i++) {
					if (i + 1 == a.length) a[i].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
					else if (!isInNeedView(a[i])) a[i].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
					var d = Math.round(100 * xrand(delay)) / 100;
					await delayInS(d / 2);
					a[i].click(); count++;
					console.log("Added: " + count);
					if (count >= amount) break;
					console.log("Delay: " + d);
					await delayInS(d / 2);
				}
			}
			console.log("Done!");
			await delayInS(0.5);
			console.log("QuocTrieudev")

		})();
		function delayInS(d, opt = 0) {
			if (opt) console.log("Wait... " + d);
			return new Promise(r => setTimeout(r, d * 1000));
		}
		function xinput(mess, defa, cond = (y) => true) {
			var x = prompt(mess);
			if (x !== null) {
				if (x == defa[0]) return defa[1];
				else return cond(x) ? x : xinput(mess, defa);
			} else return false;

		}

		function xrand(x) {
			if (typeof x == "object" || typeof x == "array") return x.length > 1 ? Math.random() * (x[1] - x[0]) - - x[0] : Math.random() * x[0];
			else return Math.random() * x;
		}
		function eselect(query, opt = 0) {
			switch (opt) {
				case 0: return document.querySelectorAll(query);
				case 1: return document.querySelector(query);
				default: return null;
			}
		}
		function isInNeedView(e, y = [0, window.innerHeight]) {
			var r = e.getBoundingClientRect(), y1 = (r.top + r.bottom) / 2;
			return y[0] <= y1 && y1 <= y[1];
		}
	}
)();