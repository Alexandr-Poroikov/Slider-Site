
document.addEventListener('DOMContentLoaded',()=>{
    //mainPages slider
    const page = new Swiper('.page', {

    parallax: true,
    speed:1000,
        pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
        },
        mousewheel:{
            sensitity: 1
            
        },
        
        whatchOverflow: true,
        observer:true,
        observerParents: true,
        observerSlideChildren: true

    });
 //---------pageHome---------

    // function removeActiveClass
    function removeActiveClass(){
        const menu = document.querySelectorAll('.menu__item')
        menu.forEach((itemMenu,index)=>{
            if(itemMenu.classList.contains('active')){
                itemMenu.classList.remove('active')
            }
            
        })
    }
    //activeLogo
    const logo = document.querySelector('.menu__logo')
    logo.addEventListener('click',()=>{
        page.activeIndex = 0
        blockSlideShow.style.display='block'
        removeActiveClass();
        setTimeout(()=>{
            page.update()
            menu[0].classList.add('active') 
        },100)
        setTimeout(()=>{
            blockSlideShow.style.display='none';
        },510)
        
    })

    //activeClass automatic and animation in pages
    page.on('slideChange', function(){
        let idx = page.realIndex
        //-on the HomePage-
        removeActiveClass()
        menu[idx].classList.add('active')

        //- animation on the AboutPage-
        animationCountAboutPage()
        

    })
    //clickMenu active page
    const menu = document.querySelectorAll('.menu__item');
    const blockSlideShow = document.querySelector('.slideShow')
    menuClick()
    function menuClick(){
        menu.forEach((itemMenu,index)=>{
            
            itemMenu.onclick = ()=>{
                page.activeIndex = index
                // activate transition block
                blockSlideShow.style.display='block'
                // remove all active class
                removeActiveClass();

                // for MOBILE_Menu 
                // -start code-
                if(window.innerWidth < 768){
                    const list = document.querySelector('.menu__list');
                    const burger = document.querySelector('.menu__burger');
                    list.classList.remove('menu__list-active')
                    burger.classList.remove('menu__burger-active')
                }
                // -end code-

                //update Swiper-pages  and Activate menu section
                setTimeout(()=>{
                    page.update();
                    menu[index].classList.add('active') 
                    // animationAboutPage()                   
                    animationCountAboutPage()
                    

                },100)
                // rest the transition block
                setTimeout(()=>{
                    blockSlideShow.style.display='none';
                    
                },510)
                
                            
            }        
        })
    }
        

    //time before festival
    sevenFest_TIME()
    function sevenFest_TIME(){
        const d = document.querySelector('.pageHome__days');
        const h = document.querySelector('.pageHome__hours');
        const m = document.querySelector('.pageHome__minutes');
        const s = document.querySelector('.pageHome__seconds');
        let fest = '2022-08-09T09:00:00';

        let interval = setInterval(()=>{
            let myDate = new Date();
            let dateFest = new Date(fest);

            // date now and new year (UNIX)
            let utixMyDate = Date.parse(myDate);
            let utixDateFest = Date.parse(dateFest);
            // time range
            let timeRange = utixDateFest - utixMyDate;
        
            // display on the page	
            let days = Math.floor(timeRange/24/60/60/1000);
            d.innerHTML = days
            // hours
            let hours = Math.floor((timeRange/60/60/1000)%24);
            hours<10? h.innerHTML ='0'+ hours: h.innerHTML = hours;
            // mins
            let mins = Math.floor((timeRange/60/1000)%60);
            mins<10? m.innerHTML ='0'+ mins: m.innerHTML = mins;
            // seconds
            let seconds = Math.floor((timeRange/1000)%60);
            seconds<10? s.innerHTML ='0'+ seconds: s.innerHTML = seconds;

            // stop condition  setInterval
            if(dateFest < myDate ){
                d.innerHTML = '00';
                h.innerHTML = '00';
                m.innerHTML = '00';
                s.innerHTML = '00';
                clearTimeout(interval)
            }

        },1000)
    }


    //---------pageAbout---------
    function animationCountAboutPage(){
        //get elBlocks
        let speakersBlock = document.querySelector('.speakers');
        let sponsorBlock = document.querySelector('.sponsor');
        let totalSeatsBlock = document.querySelector('.totalSeats');
        let topicsBlock = document.querySelector('.topics')
        //DATA elBlocks
        let speakersData = speakersBlock.dataset.speakers;
        let sponsorData = sponsorBlock.dataset.sponsor;
        let totalSeatsData = totalSeatsBlock.dataset.totalseats;
        let topicsData = topicsBlock.dataset.topics;
        //CLEAR elBlock
        speakersBlock.innerHTML = '0'
        sponsorBlock.innerHTML = '0'
        totalSeatsBlock.innerHTML = '0'
        topicsBlock.innerHTML = '0'
        //
        const elementInBlock = (elBlock, keyObject,)=>{
            elBlock.innerHTML = JSON.stringify( Math.floor(keyObject))
        }
        let obj = {
            speakers : 0,
            sponsor: 0,
            totalSeats: 0,
            topics: 0
        }
        if(page.activeIndex===1){
            console.log(page.realIndex)
            // animationAboutPage()
            gsap.to(obj, 1, {
                speakers : speakersData,
                sponsor: sponsorData,
                totalSeats: totalSeatsData,
                topics: topicsData,
                delay: .8,
                onUpdate: function(){
                    elementInBlock(speakersBlock, obj.speakers);
                    elementInBlock(sponsorBlock, obj.sponsor);
                    elementInBlock(totalSeatsBlock, obj.totalSeats);
                    elementInBlock(topicsBlock, obj.topics)
                }
            })
        }
    }
//------pageSchedule---------
const presentationTabs = document.querySelectorAll('.presentation__day'); 
const peoplePresentation = document.querySelectorAll('.peoplePresentation'); 
presentationTabs.forEach((day,index)=>{
    day.addEventListener('click', ()=>{
        if(day.classList.contains('day01')){
            peoplePresentation.forEach(people=>{
                people.style.opacity='0'
            })
            peoplePresentation[index].style.opacity='1'
        }else if(day.classList.contains('day02')){
            peoplePresentation.forEach(people=>{
                people.style.opacity='0'
            })
            peoplePresentation[index].style.opacity='1'
        }else if(day.classList.contains('day03')){
            peoplePresentation.forEach(people=>{
                people.style.opacity='0'
            })
            peoplePresentation[index].style.opacity='1'
        }else{
            peoplePresentation.forEach(people=>{
                people.style.opacity='0'
            })
            peoplePresentation[index].style.opacity='1'
        }
    })
})
//------pageClients---------
    const clients = new Swiper('.clients', {
        pagination: {
        el: '.pagination',
        clickable: true
        },
        slidesPerView: 3,
        spaceBetween: 15,

        whatchOverflow: true,
        observer:true,
        observerParents: true,
        observerSlideChildren: true,

        breakpoints: {
            280:{
                slidesPerView: 1,
            },
            768:{
                slidesPerView: 2,
            },
            992:{
                slidesPerView: 3,
            }
        }
    });
    //------pageSpeakers---------
    if(window.innerWidth < 577){

    }

//  ======= BURGER_MENU for mobile ======= 
    const burger = document.querySelector('.menu__burger');
    const list = document.querySelector('.menu__list');
    burger.addEventListener('click',()=>{
        burger.classList.toggle('menu__burger-active')
        if(burger.classList.contains('menu__burger-active')){
            // const list = document.querySelector('.menu__list');
            list.classList.add('menu__list-active')
        }else{
            list.classList.remove('menu__list-active')
        }
    })

},)












