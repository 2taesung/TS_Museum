import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import restriction from "./images/restriction.png";
import infinitetry from "./images/infinitetry.png";

export default function Home() {
  let [pageCount, setPageCount] = useState(0);
  const getTarget = function getTarget(elem, className) {
    while (!elem.classList.contains(className)) {
      elem = elem.parentNode;

      if (elem.nodeName == "BODY") {
        elem = null;
        return;
      }
    }

    return elem;
  };
  useEffect(() => {
    (function (w, d, a) {
      w.__beusablerumclient__ = {
        load: function (src) {
          var b = d.createElement("script");
          b.src = src;
          b.async = true;
          b.type = "text/javascript";
          d.getElementsByTagName("head")[0].appendChild(b);
        },
      };
      w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
    })(window, document, "//rum.beusable.net/load/b230225e000916u521");
  }, []);

  return (
    <div>
      <Head>
        <title>TS Museum!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="background">
          <div
            className="leaflet"
            onClick={(e) => {
              let pageElem = getTarget(e.target, "page");
              if (pageElem) {
                pageElem.classList.add("page-flipped");
                setPageCount((prev) => prev++);

                if (pageCount == 2) {
                  document
                    .querySelector(".background")
                    .classList.add("leaflet-opened");
                }
              }
            }}
          >
            <div className="page" data-page="1">
              <div className="page-face cover-page menu-header-title">
                <h2>TS Museum</h2>
                <p>click!</p>
              </div>
              <div className="page-face">
                <ul className="menu-list">
                  <li className="menu-item">
                    <Image
                      className="menu-item-photo"
                      src={restriction}
                      alt="Art's name is restriction as interactive coding"
                      width={100}
                      height={100}
                    />
                    <Link href="restriction">
                      <div className="menu-item-info">
                        <p className="member-name">Restriction</p>
                        <p className="member-info">
                          제한된 각도의 무한 회전을 통해 세상의 억제를 표현한다.
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page" data-page="2">
              <div className="page-face">
                <ul className="menu-list">
                  <li className="menu-item">
                    <Image
                      className="menu-item-photo"
                      src={infinitetry}
                      alt="Art's name is infinitetry as interactive coding"
                      width={100}
                      height={100}
                    />
                    <Link href="infinitewill">
                      <div className="menu-item-info">
                        <p className="member-name">Infinite Try</p>
                        <p className="member-info">
                          구름은 노력을 상징하고 무한한 노력에 의해 다른
                          노력들이 무한히 파생된다.
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="page-face">2B</div>
            </div>
            <div className="page" data-page="3">
              <div className="page-face cover-page">
                <p className="message">click!</p>
              </div>
              <div className="page-face">
                <button
                  className="close-btn"
                  onClick={(e) => {
                    const closeBtnElem = getTarget(e.target, "close-btn");
                    const pageElems = document.querySelectorAll(".page");
                    function closeLeaflet() {
                      setPageCount(0);
                      setTimeout(() => {
                        pageElems[2].classList.remove("page-flipped");
                      });
                      setTimeout(() => {
                        pageElems[0].classList.remove("page-flipped");
                      }, 500);
                    }

                    if (closeBtnElem) {
                      closeLeaflet();
                    }
                  }}
                >
                  ✗ Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
