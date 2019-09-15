import {TravelController} from "./components/controllers/travel-controller";
import {getTravel} from "./data";

const travels = new Array(12).fill(``).map(getTravel);

const travelController = new TravelController({travels});
travelController.init();
