import classes from "./About.module.css";

export default function About() {

  return <section className={classes.section} id="skills">
  
  <div className={classes.about_wrapper}>

    <h2>What this cloud platform is about</h2>
    <p>This is an cloud platform inspired by Heroku that I have built for web developers to deploy their applications easier like Heroku.</p>

    <p>This cloud platform is built on the infrastructure of Amazon Web Services to provide free compute hours and additional features such as relational databases and networking services.</p>

    <p>By default when you deploy an application of your chosen runtime/language, my cloud platform will provision an Ngnix server which then will direct its traffic to your application. Which means a user will have only a single EC2/virtual machine with multiple runtimes.</p>

    <p>If you want an isolated virtual machine with a single application, then please contact me for approval.</p>

  </div>
  </section>
}
