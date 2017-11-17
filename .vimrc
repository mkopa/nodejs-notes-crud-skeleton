set tabstop=2
set softtabstop=2
set shiftwidth=2
set expandtab
let g:syntastic_javascript_checkers = ['eslint']
let g:syntastic_javascript_eslint_exec = './node_modules/.bin/eslint'
autocmd BufRead *.js SyntasticCheck
autocmd BufRead *.jsx SyntasticCheck

