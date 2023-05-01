
import react , {useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import LogoYoutheonVF from './assets/LogoYoutheonVF.png';
import Navbar from '../navbar/Navbar';
import SideBar from '../dashboard/SideBar';
import LOGOS from './assets/LOGOSSS.jpg'
function About() {
    return(
        <>
        <Navbar />
        <div className='Dashboard_container'>
            <div className='side_container'>
                <SideBar />
            </div>
            <div className='dashboard_main'>
  
  
  
  <div className= "heading29">
   </div>
  
  
  
   <div className="about-us29">
        <img src={LogoYoutheonVF} />
        <div className="content29">
            <h2>A Propos L’association</h2>
            <p>
                Youtheon est une organisation non gouvernementale 
                dirigée par des jeunes qui vise à inspirer les jeunes 
                à atteindre leurs plein potentiel et jouer un rôle constructif 
                dans la société. La mission première de l’association Youtheon 
                est de contribuer à la création d'une société inclusive, 
                qui sera en mesure de développer et de faire grandir un cadre de vie durable.
            </p>
            <button className="thm-btn29">
                <a href="https://www.facebook.com/Youtheon.tunisia/">
                    <span>Visiter Notre Page Facebook</span></a></button>     
   </div>
   </div>
   <div className= "heading29"></div>
<div className="about-us29 ">
    <img src={LOGOS} />
    <div className="content29">
        <h2>Contexte du projet</h2>
        <p>
            Al-Maktaba, une initiative qui vise à développer une plateforme 
            électronique de ressources pédagogiques pour représenter un lien 
            numérique entre les étudiants et les professeurs afin d'accroître l'efficacité, 
            la productivité et l'efficience de l'enseignement à la FSJEGJ. Cette plateforme 
            offrira à tous les étudiants un accès égal et gratuit à de nombreuses ressources 
            et matériels pour les différentes leçons préparées par les enseignants. 
            Cette initiative est implémentée par l’association Youtheon en partenariat avec 
            l'organisation World Learning et financée par MEPI dans le cadre de programme 
            “Leadership Development Fellowship.
         </p>
           
</div>
</div>
    
    </div>
        </div>
        </>
    )
}
export default About;