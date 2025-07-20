import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const videoRef = useRef();
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        //Applying text-gradient class once before animating
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.06
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y: 200, x: 50 },  0 )
            .to('.left-leaf', { y: -200,  x: -60 }, 0 )

        const startValue = isMobile ? 'top 50%' : 'center 60%'; // On mobile: start when top of the video hits 50% of viewport; on desktop: start when center of the video crosses 60% of viewport
        const endValue = isMobile ? '120% top' : 'bottom top'; // On mobile: end after top of the video 120% scroll past screen; on desktop: end when bottom of the video reaches top of viewport

        // Video  animation timeline
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                delay: 1,
                scrub: true,
                pin: true,  //This will keep the video stuck on the screen while we are scrolling
            },
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }

    }, [])

    return (
        <>
            <section id="hero" className="noisy">

                <h1 className="title">MOJITO</h1>

                <img src="/images/hero-left-leaf.png"
                     alt="left-leaf"
                     className="left-leaf"
                />

                <img src="/images/hero-right-leaf.png"
                     alt="right-leaf"
                     className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail in our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your
                                senses.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>

            </section>

            <div className="video absolute inset-0">
                <video
                    ref={videoRef}  //Reference is used in order to do something to/with the element, in this case the cocktail glass video.
                    src="/videos/output.mp4"
                    muted //To mute the video
                    playsInline //To avoid showing bars to move fwd/bwd in the video
                    preload="auto"  //To load it automatically when opening
                />
            </div>
        </>
    )
};

export default Hero;