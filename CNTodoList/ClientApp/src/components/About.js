import React, { Component } from 'react';

export class About extends Component {
    displayName = About.name

    constructor(props) {
        super(props);
    }
    render() {        
        return (
            <div>
                <h1>Name: Carl Nery</h1>
                <h3>Cel#: 0915 283 2330</h3>
                <h3>Email: scnery@yahoo.com</h3>
                <hr />
                <div>
                    <h2>Users Table</h2>
                    <pre>
                        SET ANSI_NULLS ON<br />
                        GO<br />
                        <br />
                        SET QUOTED_IDENTIFIER ON<br />
                        GO<br />
                        <br />
                        CREATE TABLE [dbo].[Users](<br />
                        [Id] [int] IDENTITY(1,1) NOT NULL,<br />
                        [FirstName] [varchar](50) NOT NULL,<br />
                        [LastName] [varchar](50) NOT NULL,<br />
                        [Email] [varchar](50) NOT NULL,<br />
                        [Password] [varchar](50) NOT NULL<br />,<br />
                        CONSTRAINT [PK_Users1] PRIMARY KEY CLUSTERED <br />
                        (<br />
                        [Id] ASC<br />
                        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]<br />
                        ) ON [PRIMARY]<br />
                        GO<br />
                    </pre>
                    <br />
                    <h2>TodoList Table</h2>
                    <pre className="about">
                        SET ANSI_NULLS ON<br />
                        GO<br />
                        <br />
                        SET QUOTED_IDENTIFIER ON<br />
                        GO<br />
                        <br />
                        CREATE TABLE [dbo].[TodoList](<br />
                        [Id] [int] IDENTITY(1,1) NOT NULL,<br />
                        [UserId] [int] NOT NULL,<br />
                        [Description] [varchar](2000) NOT NULL,<br />
                        [IsDone] [bit] NULL,<br />
                        CONSTRAINT [PK_Todos] PRIMARY KEY CLUSTERED <br />
                        (<br />
                        [Id] ASC<br />
                        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]<br />
                        ) ON [PRIMARY]<br />
                        GO<br />

                        ALTER TABLE [dbo].[TodoList]  WITH CHECK ADD  CONSTRAINT [FK_Todos_Users] FOREIGN KEY([UserId])<br />
                        REFERENCES [dbo].[Users] ([Id])<br />
                        GO<br />
                        <br />
                        ALTER TABLE [dbo].[TodoList] CHECK CONSTRAINT [FK_Todos_Users]<br />
                        GO<br />
                    </pre>                    
                </div>
            </div>
        );
    }
}
