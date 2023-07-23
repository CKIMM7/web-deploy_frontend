import classes from "./SupportedLanguages.module.css";
import node from "../../assets/icons/Node.js_logo.svg";
import python from "../../assets/icons/python_icon.svg";
import php from "../../assets/icons/PHP_logo.svg";
import java from "../../assets/icons/java_logo.svg"
import ruby from "../../assets/icons/ruby.svg"

export default function SupportedLanguages() {

  return <section className={classes.section} id="skills">
  
  <div className={classes.skills_wrapper}>
  <h2 className={classes.skill_header}>supported languages</h2>
    <div>                        
      <img
        src={node}
        alt="html"
        loading="lazy"
        className="icon icon-card"
      />

      <img
        src={python}
        alt=""
        loading="lazy"
        className="icon icon-card"
      />
      <img
        src={php}
        alt=""
        loading="lazy"
        className="icon icon-card"
      />
      <img
        src={java}
        alt=""
        loading="lazy"
        className="icon icon-card"
      />
      <img
        src={ruby}
        alt=""
        loading="lazy"
        className="icon icon-card"
      />
    </div>
  </div>
  
</section>
}
