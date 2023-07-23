import classes from "./About.module.css";

export default function About() {

  return <div className={classes.about_wrapper}>

    <h2>How to use this cloud platform</h2>
    <p>This is an cloud platform inspired by Heroku that I have built for web developers to deploy their applications easier like Heroku.</p>

    <p>This cloud platform is built on the infrastructure of Amazon Web Services to provide free compute hours and additional features such as relational databases and networking services.</p>

  </div>
}
