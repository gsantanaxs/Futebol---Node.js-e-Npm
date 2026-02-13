const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

const escalação = [
    { numero: 1, nome: 'João Silva', posicao: 'Goleiro' },
    { numero: 2, nome: 'Carlos Souza', posicao: 'Lateral Direito' },
    { numero: 3, nome: 'Pedro Santos', posicao: 'Zagueiro' },
    { numero: 4, nome: 'Rafael Lima', posicao: 'Zagueiro' },
    { numero: 5, nome: 'Lucas Pereira', posicao: 'Lateral Esquerdo' },
    { numero: 6, nome: 'Mateus Alves', posicao: 'Volante' },
    { numero: 7, nome: 'Felipe Ribeiro', posicao: 'Meia Direita' },
    { numero: 8, nome: 'Bruno Costa', posicao: 'Meia Central' },
    { numero: 9, nome: 'Gabriel Rocha', posicao: 'Atacante' },
    { numero: 10, nome: 'André Martins', posicao: 'Atacante' },
    { numero: 11, nome: 'Diego Fernandes', posicao: 'Meia Esquerda' }
];

const server = http.createServer((req, res) => {
    console.log(`Requisição recebida: ${req.url}`.green);

    if(req.url === '/api/escalacao') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        return res.end(JSON.stringify(escalação));
    }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
           if (err.code === 'ENOENT') {
               const path404 = path.join(__dirname, 'public', '404.html');
               fs.readFile(path404, (err404, content404) => {
                       res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                       res.end(content404 || 'Página não encontrada');
                   });
           } else {
               res.writeHead(500);
               res.end(`Erro do servidor: ${err.code}`);
           }
         } else {
               res.writeHead(200, {'Content-Type': contentType});
               res.end(content, 'utf-8');
           }
        });
       });
    // if (req.url === '/') {
    //     const filePath = path.join(__dirname, 'public', 'index.html');

    //     fs.readFile(filePath, (err, content) => {  
    //         if (err) {
    //             res.writeHead(500);
    //             res.end('Erro do servidor');
    //         }else {
    //             res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //             res.end(content);
    //         }
    //     });
    // }

//     else if (req.url === '/api/dados') {
//         res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
//         res.end(JSON.stringify(dados));
//     }

//         else {
//             const path404 = path.join(__dirname, 'public', '404.html');
            
//             fs.readFile(path404, (err, content) => {  
//             if (err) {
//                 res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
//                 res.end('Página não encontrada (404)');
//             }else {
//                 res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
//                 res.end(content);
//             }
//         });
//     }
// });

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`.green.bold);
});