// for desktop
let mm = gsap.matchMedia();
mm.add("(min-width: 1100px",() => {
    document.querySelector("nav #hamburger").classList.add("hidden")
    document.querySelector("nav .subnav").classList.remove("hidden")
    document.querySelector(".main .right").classList.remove("hidden")
    var tl = gsap.timeline()
    tl.from("nav ,nav .subnav p ,nav .subnav button",{
        opacity:0,
        delay:0.5,
        duration:.8,
        y:"3vw",
        stagger:0.18
    })

    tl.from(".main .left h2 ,.main .left p ,.main .left button",{
        x:"-200 vw",
        duration:0.8,
        opacity:0,
        stagger:0.18
    },"-=1")

    tl.from(".main .right img",{
        x:"200 vw",
        duration:0.8,
        opacity:0,
    },"-=1")

    tl.from(".companys img",{
        scale:0,
        opacity:0,
        duration:0.8,
    })

    var t2 = gsap.timeline({
        scrollTrigger:{
            trigger:"#page2",
            scroller:"body",
            start:"top 50%",
            end:"top 0%",
            scrub:2,
        }
    })

    t2.from("#page2 .services",{
        opacity:0,
        x:-200,
    })

    t2.from(".cards .line1 .wraper .left",{
        opacity:0,
        x:-200,
        duration:1
    },"line1")

    t2.from(".cards .line1 .wraper .right",{
        opacity:0,
        x:200,
        duration:1
    },"line1")


    t2.from(".cards .line2 .wraper .left",{
        opacity:0,
        x:-200,
        duration:1
    },"line2")

    t2.from(".cards .line2 .wraper .right",{
        opacity:0,
        x:200,
        duration:1
    },"line2")

    var t3 = gsap.timeline({
        scrollTrigger:{
            trigger:"#page3",
            scroller:"body",
            start:"top 40%",
            end:"top -20%",
            scrub:2,
        }
    })

    t3.from(".pop",{
        opacity:0,
        scale:0,
        duration:1.5
    })

    t3.from(".case-study",{
        opacity:0,
        x:-200,
        duration:0.5
    })

    t3.from(".fotter",{
        opacity:0,
        scale:0,
        duration:1,
    })

    t3.from(".fotter div",{
        y:-50,
        opacity:0,    
    })

})

// for mobile 
mm.add("(max-width: 1100px)",() => {
    document.querySelector("nav .subnav").classList.add("hidden")
    document.querySelector(".main .right").classList.add("hidden")
    var tl = gsap.timeline()
    
    tl.from("nav ,nav ",{
        opacity:0,
        delay:0.5,
        duration:.8,
        y:"3vw",
        stagger:0.18
    })

    tl.to(".companys",{
        transform:"translatex(-80%)",
        duration:4,
        repeat:-1,
        ease:"none",
        yoyo:true
    })
    
})

