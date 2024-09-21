import Layout from 'components/Organisms/Layout';
import { useEffect, useState } from 'react';
import config from 'config';
function Dashboard() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [total, setTotal] = useState(0);
  const [trademarks, setTrademark] = useState(0);
  const [styles, setStyle] = useState(0);
  const [users, setUser] = useState(0);
  const [items, setItem] = useState(0);
  const [orders, setOrder] = useState(0);
  const url = config.baseUrl;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + '/maintainance', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setTotal(data.views.views);
          setTrademark(data.trademarks);
          setStyle(data.styles);
          setUser(data.users);
          setItem(data.items);
          setOrder(data.orders);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [url]);

  return (<>
    <Layout>
      {/* Content Wrapper. Contains page content */}
      <div className="container-fluid">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>{/* /.col */}
              
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3 style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>{orders}</h3>
                    <p style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>Pedidos</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer"><i className="fas fa-arrow-circle-right text-white" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3 style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>{Object.keys(items).length}</h3>
                    <p style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>Inventario</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer"><i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-primary text-white">
                  <div className="inner">
                    <h3 style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>{Object.keys(users).length}</h3>
                    <p style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>Usuarios</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer" ><i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner" >
                    <h3 style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>{total}</h3>
                    <p style={{ textAlign: 'center', color: '#FFF', textShadow: '1px 1px 2px black', fontSize: '30px'}}>Visitas</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer"><i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row">
              {/* Left col */}
              <section className="col-lg-7 connectedSortable">
                {/* Custom tabs (Charts with tabs)*/}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-chart-pie mr-1" />
                      Ventas
                    </h3>
                    <div className="card-tools">
                      <ul className="nav nav-pills ml-auto">
                        <li className="nav-item">
                          <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                        </li>
                      </ul>
                    </div>
                  </div>{/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content p-0">
                      {/* Morris chart - Sales */}
                      <div className="chart tab-pane active" id="revenue-chart" style={{ position: 'relative', height: 300 }}>
                        <canvas id="revenue-chart-canvas" height={300} style={{ height: 300 }} />
                      </div>
                      <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 }}>
                        <canvas id="sales-chart-canvas" height={300} style={{ height: 300 }} />
                      </div>
                    </div>
                  </div>{/* /.card-body */}
                </div>
                {/* /.card */}
                {/* DIRECT CHAT */}
                <div className="card direct-chat direct-chat-primary">
                  <div className="card-header">
                    <h3 className="card-title">Chat Directo</h3>
                    <div className="card-tools">
                      <span title="3 New Messages" className="badge badge-primary">3</span>
                      <button type="button" className="btn btn-tool" data-card-widget="collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                        <i className="fas fa-comments" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget="remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    {/* Conversations are loaded here */}
                    <div className="direct-chat-messages">
                      {/* Message. Default to the left */}
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">Alejandro Escobar</span>
                          <span className="direct-chat-timestamp float-right">23 Ene 2:00 pm</span>
                        </div>
                        {/* /.direct-chat-infos */}
                        <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                        {/* /.direct-chat-img */}
                        <div className="direct-chat-text">
                          Hola quería decir que me encantan sus productos!
                        </div>
                        {/* /.direct-chat-text */}
                      </div>
                      {/* /.direct-chat-msg */}
                      {/* Message to the right */}
                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">Fatima Calles</span>
                          <span className="direct-chat-timestamp float-left">23 Ene 2:05 pm</span>
                        </div>
                        {/* /.direct-chat-infos */}
                        <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                        {/* /.direct-chat-img */}
                        <div className="direct-chat-text">
                          Hola Elejandro, nos alegra saberlo, te damos a Andres tambien!
                        </div>
                        {/* /.direct-chat-text */}
                      </div>
                      {/* /.direct-chat-msg */}
                      {/* Message. Default to the left */}
                      <div className="direct-chat-msg">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-left">Alexander Pierce</span>
                          <span className="direct-chat-timestamp float-right">23 Ene 5:37 pm</span>
                        </div>
                        {/* /.direct-chat-infos */}
                        <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                        {/* /.direct-chat-img */}
                        <div className="direct-chat-text">
                          Regalado??? No puedo creerlo!!!
                        </div>
                        {/* /.direct-chat-text */}
                      </div>
                      {/* /.direct-chat-msg */}
                      {/* Message to the right */}
                      <div className="direct-chat-msg right">
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">Fatima Calles</span>
                          <span className="direct-chat-timestamp float-left">23 Ene 6:10 pm</span>
                        </div>
                        {/* /.direct-chat-infos */}
                        <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                        {/* /.direct-chat-img */}
                        <div className="direct-chat-text">
                          Tranquilo jaja Nadie más lo quiere xD !!
                        </div>
                        {/* /.direct-chat-text */}
                      </div>
                      {/* /.direct-chat-msg */}
                    </div>
                    {/*/.direct-chat-messages*/}
                    {/* Contacts are loaded here */}
                    <div className="direct-chat-contacts">
                      <ul className="contacts-list">
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/avatar5.png" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Andres Cordova
                                <small className="contacts-list-date float-right">26/02/2024</small>
                              </span>
                              <span className="contacts-list-msg">Ey como asi que me regalan?</span>
                            </div>
                            {/* /.contacts-list-info */}
                          </a>
                        </li>
                        {/* End Contact Item */}
                        <li>
                          <a href="#">
                            <img className="contacts-list-img" src="dist/img/avatar2.png" alt="User Avatar" />
                            <div className="contacts-list-info">
                              <span className="contacts-list-name">
                                Keiry Hernandez
                                <small className="contacts-list-date float-right">26/02/2024</small>
                              </span>
                              <span className="contacts-list-msg">Faaa no regale a Andres!!</span>
                            </div>
                            {/* /.contacts-list-info */}
                          </a>
                        </li>
                        
                        {/* End Contact Item */}
                      </ul>
                      {/* /.contacts-list */}
                    </div>
                    {/* /.direct-chat-pane */}
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <form action="#" method="post">
                      <div className="input-group">
                        <input type="text" name="message" placeholder="Escribe tu mensaje..." className="form-control" />
                        <span className="input-group-append">
                          <button type="button" className="btn btn-primary">Enviar</button>
                        </span>
                      </div>
                    </form>
                  </div>
                  {/* /.card-footer*/}
                </div>
                {/*/.direct-chat */}
                {/* TO DO List */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="ion ion-clipboard mr-1" />
                      Pendientes!
                    </h3>
                    <div className="card-tools">
                      <ul className="pagination pagination-sm">
                        <li className="page-item"><a href="#" className="page-link">«</a></li>
                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item"><a href="#" className="page-link">3</a></li>
                        <li className="page-item"><a href="#" className="page-link">»</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <ul className="todo-list" data-widget="todo-list">
                      <li>
                        {/* drag handle */}
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        {/* checkbox */}
                        <div className="icheck-primary d-inline ml-2">
                          <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                          <label htmlFor="todoCheck1" />
                        </div>
                        {/* todo text */}
                        <span className="text">Comprar mercadería</span>
                        {/* Emphasis label */}
                        <small className="badge badge-danger"><i className="far fa-clock" /> 1 h</small>
                        {/* General tools such as edit or delete*/}
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                          <label htmlFor="todoCheck2" />
                        </div>
                        <span className="text">Despedir a Andres</span>
                        <small className="badge badge-info"><i className="far fa-clock" /> 4 h</small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                          <label htmlFor="todoCheck3" />
                        </div>
                        <span className="text">Autorizar aumento de Mauricio</span>
                        <small className="badge badge-warning"><i className="far fa-clock" /> 1 min</small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                          <label htmlFor="todoCheck4" />
                        </div>
                        <span className="text">Programar día libre de Fa y Kei</span>
                        <small className="badge badge-success"><i className="far fa-clock" /> 2 días</small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                          <label htmlFor="todoCheck5" />
                        </div>
                        <span className="text">Programar Fiesta para Fatima</span>
                        <small className="badge badge-primary"><i className="far fa-clock" /> 1 semana</small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                          <label htmlFor="todoCheck6" />
                        </div>
                        <span className="text">Darle un dolar a Andres como liquidacion</span>
                        <small className="badge badge-secondary"><i className="far fa-clock" /> 1 día</small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer clearfix">
                    <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus" /> Add item</button>
                  </div>
                </div>
                {/* /.card */}
              </section>
              {/* /.Left col */}
              {/* right col (We are only adding the ID to make the widgets sortable)*/}
              <section className="col-lg-5 connectedSortable">
                {/* Map card */}
                <div className="card bg-gradient-primary">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Visitas
                    </h3>
                    {/* card tools */}
                    <div className="card-tools">
                      <button type="button" className="btn btn-primary btn-sm daterange" title="Date range">
                        <i className="far fa-calendar-alt" />
                      </button>
                      <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                    {/* /.card-tools */}
                  </div>
                  <div className="card-body">
                    <div id="world-map" style={{ height: 250, width: '100%' }} />
                  </div>
                  {/* /.card-body*/}
                  <div className="card-footer bg-transparent">
                    <div className="row">
                      <div className="col-4 text-center">
                        <div id="sparkline-1" />
                        <div className="text-white">Visitas</div>
                      </div>
                      {/* ./col */}
                      <div className="col-4 text-center">
                        <div id="sparkline-2" />
                        <div className="text-white">Compras</div>
                      </div>
                      {/* ./col */}
                      <div className="col-4 text-center">
                        <div id="sparkline-3" />
                        <div className="text-white">Perdidas</div>
                      </div>
                      {/* ./col */}
                    </div>
                    {/* /.row */}
                  </div>
                </div>
                {/* /.card */}
                {/* solid sales graph */}
                <div className="card bg-gradient-info">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-th mr-1" />
                      Sales Graph
                    </h3>
                    <div className="card-tools">
                      <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <canvas className="chart" id="line-chart" style={{ minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%' }} />
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer bg-transparent">
                    <div className="row">
                      <div className="col-4 text-center">
                        <input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                        <div className="text-white">Mail-Orders</div>
                      </div>
                      {/* ./col */}
                      <div className="col-4 text-center">
                        <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                        <div className="text-white">Online</div>
                      </div>
                      {/* ./col */}
                      <div className="col-4 text-center">
                        <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                        <div className="text-white">In-Store</div>
                      </div>
                      {/* ./col */}
                    </div>
                    {/* /.row */}
                  </div>
                  {/* /.card-footer */}
                </div>
                {/* /.card */}
                {/* Calendar */}
                <div className="card bg-gradient-success">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="far fa-calendar-alt" />
                      Calendar
                    </h3>
                    {/* tools card */}
                    <div className="card-tools">
                      {/* button with a dropdown */}
                      <div className="btn-group">
                        <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                          <i className="fas fa-bars" />
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <a href="#" className="dropdown-item">Add new event</a>
                          <a href="#" className="dropdown-item">Clear events</a>
                          <div className="dropdown-divider" />
                          <a href="#" className="dropdown-item">View calendar</a>
                        </div>
                      </div>
                      <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                    {/* /. tools */}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body pt-0">
                    {/*The calendar */}
                    <div id="calendar" style={{ width: '100%' }} />
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </section>
              {/* right col */}
            </div>
            {/* /.row (main row) */}
          </div>{/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>

    </Layout></>);
}

export default Dashboard;
