import { observable, action, computed, autorun } from 'mobx';
import axios from 'axios';
import moment from "moment";


export class Notebook {
    loaded = observable(false);
    loadingText = observable("Loading from remote server....");
    notebook = observable([]);

    getNotebook = action(() => {
        this.notebook = [];
        axios({
            method: "get",
            url: "/api/notebook/",
            headers: {"Authorization": "Token " + sessionStorage.getItem("token")}
        }).then(action("response action", (response) =>{
            console.log(response);
            (response.data).map(function (notebook) {
                let hiren = {};
                hiren["id"] = notebook["id"];
                hiren["name"] = notebook["name"];
                hiren["created_at"] = moment.utc(notebook["created_at"]).local().format("dddd, DD MMMM YYYY hh:mm:ss A");
                this.notebook.push(hiren);
            }.bind(this));
            this.loaded = true;
        })).catch(function (error) {
            console.error(error);
            // sweetAlert("Oops!", error.statusText, "error");
        })

    })

}