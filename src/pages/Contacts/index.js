// Dependecies
import React, { Component } from 'react';

// Styles
import { 
    Container,
    Chat, 
    Content, 
    Chats, 
    Title, 
    Messages, 
    Local, 
    BoxSent, 
    WritteMessage, 
    MessageSent 
} from './style';

// Components
import Menu from '../../components/Menu';
import Search from '../../components/Search';
import ContactList from '../../components/ContactList';
import SendIcon from '../../assets/images/icon_send.svg';

import io from 'socket.io-client'


export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        message: [
            ''
        ],
        newmessage: ''
    }

    componentDidMount() {
        this.socket = io('http://localhost:3333')
        if (!localStorage.getItem('mensagens')) {

            // Objeto  inical 
            const msgauto = [
                {
                    mensagem: [
                    ],
                    horario: '15:30' 
                }
            ]

            localStorage.setItem('mensagens', JSON.stringify(msgauto[0].mensagem = ["INICIE UMA CONVERSA"]))
        }

        const messageSent = localStorage.getItem('mensagens');
        this.setState({ message: JSON.parse(messageSent) })
    }

    componentDidUpdate(_, prevState) {
        // this.socket.on('chat message', data => {
        //     this.setState({
        //         message: [
        //             ...this.state.message, data
        //         ]
        //     })
        // })
        
        if (prevState != this.state.message) {
            localStorage.setItem('mensagens', JSON.stringify(this.state.message));
        }
    }

    handleInputChange = e => {
        this.setState({ newmessage: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        let input = document.getElementById('mensagem').value;
        if (input !== '') {
            // this.socket.emit('chat message', this.state.newmessage)
            this.setState({
                message: [...this.state.message, this.state.newmessage],
                newmessage: ''
            })
        }
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();

    }

    handleDeleteStorage() {
        localStorage.clear();
        window.location.reload()
    }

    scrollMessage(){
    }

    render() {
        return (
            <Container>
                <Menu />
                <Content>
                    <Chats>
                        <h1>Grillo</h1>
                        <Local>
                            <h4>MENSAGENS</h4>
                        </Local>
                        <ContactList />
                    </Chats>
                    <Messages>
                        <Search />
                        <Title>
                            <h3>RIHANNA</h3>
                            <button onClick={this.handleDeleteStorage}> L</button>
                        </Title>
                        <Chat>
                            <MessageSent>
                                {this.state.message.map((key, index) => (
                                    <BoxSent key={index}>
                                        {key}
                                    </BoxSent>
                                ))}
                            </MessageSent>
                        </Chat>

                        <WritteMessage onSubmit={this.handleSubmit}>
                            <input id="mensagem"
                                placeholder="Digite sua mensagem"
                                value={this.state.newmessage}
                                onChange={this.handleInputChange}
                            />
                            <button type="submit">
                                <img src={SendIcon} alt="enviar" />
                            </button>
                        </WritteMessage>

                    </Messages>
                </Content>
            </Container >
        );
    }
}

