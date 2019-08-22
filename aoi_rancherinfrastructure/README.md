# AGID Open Innovation - Configurazione Infrastruttura

## Contenuti
Questa cartella contiene i file ***.yaml** estratti dopo la configurazione finale dell'infrastruttura di produzione.

Le cartelle sono divise in questo modo:
* Load Balancing: contiene la configurazione della regola di ingress per esporre la webapp *"all'esterno"*
* Workloads: contiene le configurazioni dei container pod di MongoDb, ElasticSearch e la WebApp AOI-Apos
* Persistent Volume: contiene le configurazioni dei persistent volume usati dai vari container pod. <br/>**N.B!** prima di importare questi yaml assicurarsi che i persistent storage siano configurati a livello di cluster con i nomi corretti.
* Namespace: Contiene il file di configurazione dell'intero namespace, con ogni tipo di risorsa legata ad esso. Per semplicità abbiamo usato sempre il namespace **"default"**

## Altri dettagli sull'infrastruttura

Al momento, l'infrastruttura è stata configurata come segue:

| Nome        | Ruolo           | Container Pod  | Regole ingress | Porte interne cluster | Service Discovery | Storage |
| ------------- |:-------------:| -----:| ------------- | ------------- | ------------- | ------------- |
| pcp-srv01    | Rancher Server | n/a | Rancher esposto su https:443/tcp | n/a | kubernetes | n/a |
| pcp-srv03    | Worker/etcd/CP | ElasticSearch | n/a | HostPort:9200 | elasticsearch | elasticconf, elasticvolume
| pcp-srv04    | Worker/etcd/CP | MongoDB | n/a | HostPort:27017 | mongodb | mongovolume
| pcp-srv05    | Worker/etcd/CP | Web | 443/https => innovare.gov.it, 443/https => innovare.gov.it/, 32766/tcp, 8080/tcp  | HostPort:8080, NodePort:32776, ClusterIP:8080, LoadBalancer(name: web):443 | aoi-apos | apos-appdata, apos-publicuploads
| pcp-srv06    | Worker/etcd/CP | Kibana | n/a | HostPort:5601 | kibana | n/a |

Dove per le porte i [*"ruoli"*](https://rancher.com/docs/rancher/v2.x/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport/):

* HostPort (nodi che girano su un pod): Come su docker, in questo caso verrà aperta la porta sul nodo host dove il pod è schedulato o attivo. E' il modo più semplice per aprire una porta senza aggiungere regole di ingress, ma non ti consente di schedulare il pod su più di un nodo.
* NodePort (Su ogni nodo): Limitato sul range di porte 30000 => ~33,000. E' il modo migliore per esporre un pod che è schedulato su più nodi (quindi con più istanze) dietro load balancing.
* Cluster IP (Solo interno): In questo caso vengono esposte le porte sulla rete interna del cluster
* LoadBalancer (name: x): Questa regola associa l'ingress con il nome specificato al workload selezionato. **N.B!** Le regole di load balancing consentono di esporre il service/workload solo su porte 80 e/o 443, a seconda o meno della presenza del certificato TLS o della regola HTTPS Only

mentre gli storage sono configurati come segue:

| Nome        | Tipo           | Path | Taglia | Modalità di accesso |
| ------------- |:-------------:| -----:| ------------- | ------------- | ------------- |
| apos-appdata       | Local Node Path           | /mnt/vdb1/data-apos/data| 10GB | Nodo singolo R/W |
| apos-publicuploads       | Local Node Path           | /mnt/vdb1/data-apos/public/uploads/ | 10GB | Nodo singolo R/W |
| elasticdata     | Local Node Path           | /mnt/vdb1/elastic | 10GB | Nodo singolo R/W |
| pv-rwfrp   | Local Node Path           | /mnt/vdb1/elasticsearchconf | 10GB | Nodo singolo R/W |
| mongodata   | Local Node Path           | /mnt/vdb1/mongodata | 10GB | Nodo singolo R/W |

Per maggiori dettagli su:

* [Best practice Kubernetes sulla configurazione della rete](https://kubernetes.io/docs/concepts/configuration/overview/)
* [Quick start di Rancher sulla rete](https://rancher.com/docs/rancher/v2.x/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport/)
* [Altri dettagli sui **ruoli di rete**](https://stackoverflow.com/questions/50709001/rancher-2-difference-between-nodeport-hostport-and-cluster-ip)
* [Volumi e storage](https://rancher.com/docs/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/)
* [PVC (Persistent Volume Claim)](https://rancher.com/docs/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims/)
* [PVC (Persistent Volume Claim) Concept](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
