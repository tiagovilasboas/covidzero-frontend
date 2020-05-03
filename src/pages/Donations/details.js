import React,{useEffect,useState} from "react";
import {useParams } from "react-router-dom";
import { useTranslation }          from "react-i18next";
import { Cell, Grid, Row }         from "@material/react-layout-grid";
import history                     from "~/services/history";
import { Header,Button,CardStats,Loading } from "~/components";

import * as Styled from "./styles.js";

 import API from "~/API";

export default function Details() {
    const [t]  = useTranslation();    
    let { id } = useParams();
    
    const [loadingStatus, setloadingStatus] = useState(true)

    const initalProjects = {
      id:0,
      name:"",
      about:"",
      goal:0,
      quota_total:0,
      quota_value:0,
      photo:{url:false} 
    }

    
    const [Projects, setProjects]     = useState(initalProjects)

    useEffect(() => {
      (async () => {         
          API.donations.findProjects(id).
             then(response =>{
                setProjects(response);
                setloadingStatus(false);
          })
            .catch(ret=> history.push("/donations"));

            
       }
      )()

    },[]);

    

    let formato = { minimumFractionDigits: 2 , currency: 'BRL' }

    

    function formatValor(_value){
                let value =_value!=null ? _value :0;

         return parseFloat(value).toLocaleString('pt-BR',formato);
    }


  return (
    <>
      <Loading spinning={loadingStatus} />
      <Header title={t("header.donations")} rightIcon={Notification} />

          <Styled.ContentImg>
                  {Projects.photo.url && <img src={Projects.photo.url} />}
                  <div className="title-img">{Projects.name}</div>
         </Styled.ContentImg> 

         <Styled.MobContainer>


                <Grid className="GridCardtats">
                      <Row>
                        <Cell
                            desktopColumns={6}
                            phoneColumns={4}
                            tabletColumns={4}
                          >
                           <CardStats 
                            title={<div>Arrecadado</div>} 
                            count={formatValor(Projects.quota_total)}
                            className="donation-stats"
                            /> 
                        </Cell>
                        <Cell
                            desktopColumns={6}
                            phoneColumns={4}
                            tabletColumns={4}
                          >
                           <CardStats 
                            title={<div>Meta</div>} 
                            count={formatValor(Projects.goal)}
                            className="donation-stats"
                            /> 
                        </Cell>                        
                      </Row>
                </Grid> 


                <Styled.ContentText>
                 <div class="content-placeholder"  style={loadingStatus? {display:"block"}: {display:"none"}} >
                      <div class="animated-background  content-1"></div>
                      <div class="animated-background  content-2"></div>
                      <div class="animated-background  content-3"></div>
                      <div class="animated-background  content-4"></div>
                      <div class="animated-background  content-1"></div>
                      <div class="animated-background  content-2"></div>
                      <div class="animated-background  content-3"></div>
                      <br/>
                      <div class="animated-background  content-4"></div>
                      <div class="animated-background  content-1"></div>
                      <div class="animated-background  content-2"></div>
                      <div class="animated-background  content-3"></div>
                      <div class="animated-background  content-4"></div>                                            
                 </div>       

                   {Projects.about}
                   <p><b>Quanto  o CovidZero ganha?</b></p>
                   <p>Nada! O valor recebido é passado diretamente para a instituição escolhida e o CovidZero não recebe nenhuma doação por isso.</p>
                </Styled.ContentText> 
                
                
                <Button 
                  styleButton='sm-light-btn'  
                  textButton='Doe a partir de R$5'
                  className="full-light-btn"  
                  onClick={() => history.push("/donations/checkout/"+Projects.id)}                                                    
                />

         </Styled.MobContainer>

    </>
  ); 

}