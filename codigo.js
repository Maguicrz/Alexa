const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak('¡Hola!... '+HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const DatoCuriosoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'DatoCuriosoIntent';
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput + " " + HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Se ha terminado la sesión por las siguientes causas: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('<say-as interpret-as="interjection">épale ocurrió un error</say-as>')
      .reprompt('Lo siento, ocurrió un error')
      .getResponse();
  },
};

const SKILL_NAME = 'Curiosidades de Agujeros Negros';
const GET_FACT_MESSAGE = 'Un dato curioso es que ';
const HELP_MESSAGE = 'Puedes decir: Dame un dato curioso... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';
const STOP_MESSAGE = 'Adios y <say-as interpret-as="interjection">buena suerte</say-as>';

const data = [
  //TODO agrega tu contenido de datos curiososo aqui... 
  'Los agujeros negros se crean cuando una estrella agota su combustible y la materia restante, si queda suficiente, colapsa debido a su propia gravedad, convirtiéndose en una singularidad, es decir, un punto sin volumen y de densidad infinita.',
  'Pero no todas las estrellas pueden transformarse en agujero negro: debe tener con una masa mínima que es 25 veces superior a la masa de nuestro Sol. En la Vía Láctea, menos de una estrella de cada mil dispone de masa suficiente para transformarse en un agujero negro.',
  'Aunque lo hayas visto una y mil veces interpretado como un gigantesco hoyo que traga toda la materia a su alrededor, en realidad nadie es capaz de saber cómo es un agujero negro. Esto es debido a que nada puede escapar a su enorme gravedad, ni siquiera la luz, por lo que ninguno ha sido observado a día de hoy.',
  '¿Puede un agujero negro destruir la Tierra? Pese a que hay un agujero negro en nuestra galaxia, en teoría no hay peligro para nuestro planeta. Además, la NASA aclara que lejos a lo que la mayoría cree, los agujeros negros no vagabundean por el Universo tragando mundos al azar. Si un día el Sol fuera reemplazado por un agujero negro, la Tierra no sería arrastrada, sino que seguiría orbitando alrededor de este.',
  'Los agujeros negros pueden fusionarse entre sí. De acuerdo a investigaciones científicas, cuando dos galaxias se fusionan, sus agujeros negros terminan uniéndose en el centro de la nueva galaxia.',
  'Según la NASA, los agujeros negros no son un peligro para la Tierra.',
  'El tiempo se ralentiza cuanto más cerca estás de un agujero negro. Esto se debe a la enorme fuerza de la gravedad que ejercen. Tanto es así que son capaces incluso de distorsionar al mismísimo tiempo.',
  'En los agujeros negros la gravedad es tan fuerte porque la materia ha sido exprimida en un espacio diminuto. Ninguna partícula puede escapar de ella.',
  'Lo cierto es que no se sabe con exactitud qué hay en el centro de un agujero negro. Se cree que existe una curvatura del espacio tiempo llamada singularidad. Ahí es donde grandes cantidades de materia es tragada por un trozo de espacio inmensamente pequeño y denso.',
  '¿Qué te sucedería si cayeras en el interior de un agujero negro?. Esto es pura especulación, pues nadie ha estado dentro de un agujero negro y ha salido para contarlo. Sin embargo, según el astrofísico británico Martin Rees, nuestro cuerpo sufriría un fenómeno que llama espaguetización. Es decir, nuestro cuerpo se estiraría como pasta de dientes saliendo de un tubo, convirtiéndose en un rayo de partículas subatómicas en dirección hacia el agujero negro.',
  'Los agujeros negros no son tan negros: Aunque es cierto que los agujeros negros no dejan escapar nada, por la década de los setentas Stephen Hawking descubrió que sí que emitían una débil radiación. Esta la llamaron Radiación de Hawking en honor a su descubridor.  Esto ocurre por un proceso un poco curioso que ocurre dentro del agujero negro. Las llamadas fluctuaciones cuánticas producen pares de partícula-antipartícula a partir del vacío. Para que no sea violada la conservación de la energía, estas se aniquilan al instante para devolver la energía al agujero negro. El problema es que, en el horizonte de sucesos, la probabilidad de que se forme una de las partículas dentro y la otra fuera no es nula. Por lo cual una parte del par podría escapar del agujero negro.',
  'Al contrario de lo que se ve en la mayoría de las películas de ciencia ficción, los agujeros negros no devoran todo lo que tocan. De hecho, si nuestro sol repentinamente colapsara en un agujero negro de la misma masa, lo único que notaríamos es que ya no hay luz de día. Y, obviamente moriríamos congelados. Pero los planetas seguirían con sus órbitas inalteradas.',
  'La fusión de dos agujeros negros es un evento tan violento que altera el espacio y el tiempo. Estas alteraciones viajan por el espacio a la velocidad de la luz. Es como si el espacio fuera un estanque lleno de agua y arrojásemos una roca. Las ondas que se producen viajan por todo el estanque alterando la superficie del agua. Esta alteración del tejido espacio temporal se llaman ondas gravitacionales. Estas ondas fueron predichas por la teoría de la relatividad de Einstein y fundan las bases para un concepto conocido como Gravedad Cuántica. LIGO logró demostrar que estas ondas existen',
  'El agujero negro más cercano a la Tierra es Cygnus X-1. Para que la Tierra fuera engullida por este agujero negro, tendría que estar a menos de 21 km de ella. No hay que temer, pues: Cygnus X-1 se encuentra a una distancia de 8000 años luz.',
  'A pesar de la popular creencia de que los agujeros negros lo consumen todo, esto no es del todo cierto. Parte de la materia consumida por los agujeros negros se expulsa, creando los llamados discos de acreción que tienen forma circular y rodean dichos agujeros negros.',
  'Sabemos que los agujeros negros son fenómenos fascinantes, capaces hasta de curvar la realidad. Al compactar la materia en un espacio extraordinariamente diminuto, forman un objeto con una atracción gravitacional enorme. Alrededor de este objeto, hay una frontera a partir de la cual nada puede escapar, ni siquiera la luz: el horizonte de eventos. Además de atraer grandes cantidades de materia, el horizonte de eventos atrae mucha atención de astrónomos de todo el mundo.'


];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DatoCuriosoHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
