
// api for events & news

function get_result() {

    let url = `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_ID}/posts?key=${BLOGGER_API_KEY}`
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            const bloggerdata = data.items;
            console.log(bloggerdata)
            let AmountOfArticle = bloggerdata.length
            let titleOfArticle;
            let dateOfArticle;
            let imgOfArticle
            let blogUrl;
            let bloglabels
            for (let i = 0; i < 4; i++) {
                titleOfArticle = bloggerdata[i].title;
                imgOfArticle = bloggerdata[i].content;
                dateOfArticle = bloggerdata[i].published;
                blogUrl = bloggerdata[i].url
                bloglabels = bloggerdata[i].labels
                getDates(dateOfArticle)

            }


            let createDivForWrap = document.createElement('div');
            createDivForWrap.classList.add("divForWrap");


            function getDates(dateOfArticle) {
                let year = parseInt(dateOfArticle);
                let time = new Date(dateOfArticle)
                let month = time.getMonth() + 1
                let date = time.getDate()
                let publishedDateArr = []

                publishedDateArr.push(year, month, date)
                let publishedDateArrComma = publishedDateArr.join('.')
                // console.log(publishedDateArrComma)
                appendDateNew(publishedDateArrComma, titleOfArticle)
            }




            function appendDateNew(date, titleOfArticle) {

                let newsContentWrap = document.getElementById('eventsnews-wrap')


                // append published date in p div

                let createDivForListWrap = document.createElement('div');
                createDivForListWrap.classList.add("createDivForEventsNewsWrap");






                // wrap for date and new
                let createDivForDateLabelWrap = document.createElement('div');
                createDivForDateLabelWrap.classList.add("createDivForDateLabelWrap");



                // label for new
                const currentTime = Date.now()
                let timestampDateOfArticle = new Date(dateOfArticle).valueOf()
                let timeGap = currentTime - timestampDateOfArticle
                const threeDays = 86400000 * 3
                if (timeGap < threeDays) {
                    let createdivForNew = document.createElement('div')
                    createdivForNew.classList.add("createDivForNew");
                    let NewTextnode = document.createTextNode('NEW')
                    createdivForNew.appendChild(NewTextnode)
                    createDivForDateLabelWrap.appendChild(createdivForNew)
                    createDivForListWrap.appendChild(createDivForDateLabelWrap)
                } else {
                    let createdivForOld = document.createElement('div')
                    createdivForOld.classList.add("createDivForEmpty");
                    let oldTextnode = document.createTextNode('old')
                    createdivForOld.appendChild(oldTextnode)
                    createDivForDateLabelWrap.appendChild(createdivForOld)
                    createDivForListWrap.appendChild(createDivForDateLabelWrap)
                }

                // image
                let imageevenetsnews = document.createElement('img')
                createDivForListWrap.appendChild(imageevenetsnews)

                let m,
                    urls = [],
                    str = imgOfArticle,
                    rex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;

                while (m = rex.exec(str)) {
                    imageevenetsnews.src = m[1]
                    imageevenetsnews.classList.add("eventsnews-box-img");

                }


                // wrap for published date
                let createdivfordatelabel = document.createElement('div')
                createdivfordatelabel.classList.add("createdivfordatelabel");


                let createPForYear = document.createElement('p')
                createPForYear.classList.add("createPForTime");
                let publishedDateArrTextnode = document.createTextNode(date)
                createPForYear.appendChild(publishedDateArrTextnode)

                createdivfordatelabel.appendChild(createPForYear)
                createDivForDateLabelWrap.appendChild(createdivfordatelabel)


                // get type of labels for articles

                let createPForbloglabel = document.createElement('p')
                createPForbloglabel.classList.add("createPForbloglabel");

                for (let i = 0; i < bloglabels.length; i++) {
                    if (bloglabels[i] === "イベント情報") {
                        createPForbloglabel.setAttribute("id", "wrap-events");
                    }
                    if (bloglabels[i] === "お知らせ") {
                        createPForbloglabel.setAttribute("id", "wrap-news");
                    }
                    if (bloglabels[i] === "その他") {
                        createPForbloglabel.setAttribute("id", "wrap-others");
                    }
                }

                let bloglabelTextnode = document.createTextNode(bloglabels)
                createPForbloglabel.appendChild(bloglabelTextnode)

                createdivfordatelabel.appendChild(createPForbloglabel)
                createDivForListWrap.appendChild(createdivfordatelabel)


                // wrap for title Of Article

                let createaFortitleOfArticle = document.createElement('a')
                createaFortitleOfArticle.classList.add("createaFortitleOfArticle");
                createaFortitleOfArticle.href = blogUrl
                let titleOfArticleTextnode = document.createTextNode(titleOfArticle)
                createaFortitleOfArticle.appendChild(titleOfArticleTextnode)
                createDivForListWrap.appendChild(createaFortitleOfArticle)


                newsContentWrap.appendChild(createDivForListWrap)
                // console.log(date)

            }
            // console.log(bloggerdata[0].title)
        })
}

get_result()