const banco = [
{ id:1, tema:"Posição anatômica", pergunta:"Durante a avaliação inicial em uma academia, o professor pede que o aluno fique na posição anatômica antes de analisar sua postura. Descreva como o corpo deve estar posicionado nessa posição.", resposta:"Indivíduo em pé, ereto, face voltada para frente, membros superiores ao lado do corpo, palmas voltadas anteriormente e pés paralelos." },

{ id:2, tema:"Posição anatômica", pergunta:"Em uma aula de avaliação postural na academia, o professor explica que todas as descrições do corpo partem da posição anatômica. Explique por que essa posição é utilizada como referência.", resposta:"Porque padroniza a descrição das estruturas e das relações anatômicas no corpo humano." },

{ id:3, tema:"Termos anatômicos", pergunta:"Durante um treino de musculação, o professor afirma que o cotovelo está proximal ao punho. Explique o significado do termo proximal.", resposta:"Proximal refere-se a uma estrutura mais próxima da origem do membro ou do tronco." },

{ id:4, tema:"Termos anatômicos", pergunta:"Durante um exercício de barra fixa, o treinador afirma que a mão está distal ao cotovelo. Explique o termo distal.", resposta:"Distal indica que uma estrutura está mais afastada da origem do membro ou do tronco." },

{ id:5, tema:"Termos anatômicos", pergunta:"Durante a execução de elevação lateral do ombro na academia, o professor explica que o braço se afasta da linha média do corpo. Explique o termo lateral.", resposta:"Lateral refere-se ao que está mais distante da linha média do corpo." },

{ id:6, tema:"Termos anatômicos", pergunta:"Em uma aula de anatomia aplicada ao esporte, o treinador afirma que o nariz está medial em relação aos olhos. Explique o termo medial.", resposta:"Medial significa mais próximo da linha média do corpo." },

{ id:7, tema:"Termos anatômicos", pergunta:"Durante uma explicação sobre musculatura do tórax, o professor afirma que o peitoral maior está anterior ao coração. Explique o termo anterior.", resposta:"Anterior significa localizado na parte da frente do corpo." },

{ id:8, tema:"Termos anatômicos", pergunta:"Durante um treino de fortalecimento do dorso, o professor explica que os músculos das costas estão posteriores ao tórax. Explique o termo posterior.", resposta:"Posterior significa localizado na parte de trás do corpo." },

{ id:9, tema:"Termos anatômicos", pergunta:"Durante uma avaliação física, o professor explica que a pele é superficial em relação aos músculos. Explique o termo superficial.", resposta:"Superficial refere-se ao que está mais próximo da superfície corporal." },

{ id:10, tema:"Termos anatômicos", pergunta:"Em uma aula prática na academia, o treinador explica que alguns músculos são profundos. Explique o termo profundo.", resposta:"Profundo refere-se ao que está mais distante da superfície corporal." },

{ id:11, tema:"Termos anatômicos", pergunta:"Durante um exercício de corrida na esteira, o professor afirma que o joelho está intermédio entre o quadril e o tornozelo. Explique o termo intermédio.", resposta:"Intermédio indica que uma estrutura está localizada entre duas outras." },

{ id:12, tema:"Planos e eixos", pergunta:"Durante a execução de rosca direta na academia, em qual plano ocorre principalmente o movimento de flexão do cotovelo?", resposta:"No plano sagital." },

{ id:13, tema:"Planos e eixos", pergunta:"Durante a execução de elevação lateral com halteres, em qual plano ocorre o movimento do ombro?", resposta:"No plano frontal ou coronal." },

{ id:14, tema:"Planos e eixos", pergunta:"Durante exercícios de rotação do tronco em treino funcional, em qual plano ocorre esse movimento?", resposta:"No plano transversal." },

{ id:15, tema:"Planos e eixos", pergunta:"Durante a flexão do cotovelo em exercícios de musculação, qual eixo está relacionado a esse movimento?", resposta:"Eixo transversal." },

{ id:16, tema:"Planos e eixos", pergunta:"Durante a abdução do ombro em elevação lateral, qual eixo está envolvido no movimento?", resposta:"Eixo anteroposterior." },

{ id:17, tema:"Planos e eixos", pergunta:"Durante a rotação do tronco em um treino de core, qual eixo está envolvido?", resposta:"Eixo longitudinal." },

{ id:18, tema:"Sistema esquelético", pergunta:"Durante exercícios na academia, o professor explica que os ossos funcionam como alavancas. Explique essa função do sistema esquelético.", resposta:"Os ossos funcionam como alavancas sobre as quais os músculos atuam para produzir movimento." },

{ id:19, tema:"Sistema esquelético", pergunta:"Durante uma aula sobre anatomia aplicada ao esporte, explique a função de proteção do sistema esquelético.", resposta:"Proteger órgãos vitais como encéfalo, coração e pulmões." },

{ id:20, tema:"Sistema esquelético", pergunta:"Durante uma avaliação postural em atletas, explique a função de sustentação do sistema esquelético.", resposta:"Sustentar o corpo e manter sua forma estrutural." },
{ id:21, tema:"Sistema esquelético", pergunta:"Durante um treino de corrida, o professor explica que o fêmur é classificado como osso longo. Explique essa classificação.", resposta:"Osso longo possui comprimento maior que largura e espessura, com diáfise e epífises." },

{ id:22, tema:"Sistema esquelético", pergunta:"Durante uma explicação sobre coluna vertebral em uma aula de treinamento funcional, o professor afirma que as vértebras são ossos irregulares. Explique por quê.", resposta:"Porque possuem forma complexa que não se encaixa nas categorias de ossos longos, curtos ou planos." },

{ id:23, tema:"Sistema esquelético", pergunta:"Durante uma aula sobre proteção de órgãos durante o exercício, explique por que o esterno é classificado como osso plano.", resposta:"Porque é largo e relativamente fino, atuando na proteção de órgãos e inserção muscular." },

{ id:24, tema:"Sistema esquelético", pergunta:"Durante um treino de força para mãos e punhos, o professor menciona que os ossos do carpo são ossos curtos. Explique essa classificação.", resposta:"Ossos curtos possuem comprimento, largura e espessura semelhantes." },

{ id:25, tema:"Traumas esportivos", pergunta:"Durante uma corrida em quadra, um atleta sofre queda apoiando a mão estendida e apresenta dor no punho. Explique por que o escafoide é frequentemente lesionado nesse tipo de trauma.", resposta:"Porque recebe grande carga quando a mão é apoiada em extensão durante a queda." },

{ id:26, tema:"Joelho", pergunta:"Em esportes como futebol, pode ocorrer a chamada tríade infeliz do joelho. Quais estruturas são lesionadas nessa condição?", resposta:"Ligamento cruzado anterior, ligamento colateral medial e menisco medial." },

{ id:27, tema:"Joelho", pergunta:"Explique por que a tríade infeliz compromete tanto a estabilidade do joelho de um atleta.", resposta:"Porque envolve ligamentos importantes e o menisco medial, estruturas fundamentais para estabilidade." },

{ id:28, tema:"Joelho", pergunta:"Durante um treino de salto, explique a função dos meniscos do joelho.", resposta:"Absorver impacto, distribuir carga e contribuir para estabilidade articular." },

{ id:29, tema:"Joelho", pergunta:"Explique como os meniscos ajudam a proteger o joelho durante atividades esportivas.", resposta:"Aumentam a congruência entre as superfícies articulares e distribuem forças." },

{ id:30, tema:"Articulações", pergunta:"Durante uma aula de anatomia aplicada ao esporte, explique a função do líquido sinovial.", resposta:"Lubrificar a articulação e reduzir o atrito entre as superfícies articulares." },

{ id:31, tema:"Articulações", pergunta:"Explique como o líquido sinovial contribui para a nutrição da cartilagem articular.", resposta:"Fornecendo nutrientes por difusão." },

{ id:32, tema:"Articulações", pergunta:"Durante a análise de articulações em atletas, explique a função da cápsula articular.", resposta:"Envolver, proteger e estabilizar a articulação." },

{ id:33, tema:"Articulações", pergunta:"Explique como a cápsula articular contribui para manter os ossos unidos na articulação.", resposta:"Mantendo os ossos articulados e contribuindo para estabilidade." },

{ id:34, tema:"Articulações", pergunta:"Explique o que caracteriza uma articulação sinovial.", resposta:"Presença de cápsula articular, cavidade articular e líquido sinovial." },

{ id:35, tema:"Articulações", pergunta:"Explique por que as articulações sinoviais permitem grande mobilidade em atividades esportivas.", resposta:"Porque possuem cavidade articular e líquido sinovial que reduzem o atrito." },

{ id:36, tema:"Joelho", pergunta:"Durante um treino de agachamento, explique o papel biomecânico da patela.", resposta:"Aumentar a eficiência mecânica do quadríceps na extensão do joelho." },

{ id:37, tema:"Joelho", pergunta:"Explique por que a patela é classificada como osso sesamoide.", resposta:"Porque se desenvolve dentro de um tendão." },

{ id:38, tema:"Joelho", pergunta:"Explique como a patela aumenta o braço de alavanca do quadríceps.", resposta:"Afastando o tendão do eixo de rotação do joelho." },

{ id:39, tema:"Coluna vertebral", pergunta:"Durante uma avaliação de coluna em atletas, explique o que é sacralização de L5.", resposta:"Fusão da quinta vértebra lombar com o sacro." },

{ id:40, tema:"Coluna vertebral", pergunta:"Explique o que é lombarização de S1.", resposta:"Separação da primeira vértebra sacral, que passa a comportar-se como lombar." },
{ id:41, tema:"Coluna vertebral", pergunta:"Explique por que alterações como sacralização e lombarização podem gerar dor lombar em atletas.", resposta:"Porque modificam a biomecânica e a distribuição de cargas da coluna." },

{ id:42, tema:"Sistema locomotor", pergunta:"Durante um treino de corrida, explique como o sistema esquelético participa da locomoção.", resposta:"Servindo como suporte estrutural e alavanca para os músculos." },

{ id:43, tema:"Sistema locomotor", pergunta:"Explique a função geral das articulações no sistema locomotor.", resposta:"Unir os ossos e permitir movimento entre eles." },

{ id:44, tema:"Sistema locomotor", pergunta:"Explique com quais sistemas o sistema articular atua em conjunto durante o exercício físico.", resposta:"Sistema muscular e sistema esquelético." },

{ id:45, tema:"Sistema locomotor", pergunta:"Explique por que as articulações são essenciais para os movimentos realizados em esportes.", resposta:"Porque permitem mobilidade entre os ossos." },

{ id:46, tema:"Sistema locomotor", pergunta:"Explique a importância das articulações para atividades como correr e saltar.", resposta:"Permitem movimentos coordenados e absorção de impacto." },

{ id:47, tema:"Joelho", pergunta:"Explique como os meniscos ajudam na distribuição de carga durante a corrida.", resposta:"Distribuindo as forças compressivas no joelho." },

{ id:48, tema:"Articulações", pergunta:"Explique como os ligamentos contribuem para estabilidade das articulações.", resposta:"Limitando movimentos excessivos e mantendo alinhamento ósseo." },

{ id:49, tema:"Articulações", pergunta:"Explique o papel da cartilagem articular nas articulações.", resposta:"Reduzir atrito e absorver impacto." },

{ id:50, tema:"Articulações", pergunta:"Explique por que as articulações precisam de estabilidade e mobilidade.", resposta:"Para permitir movimento eficiente sem lesões." },

{ id:51, tema:"Biomecânica", pergunta:"Durante exercícios de impacto, explique como o sistema articular dissipa forças.", resposta:"Por meio da ação conjunta de cartilagem, meniscos e líquido sinovial." },

{ id:52, tema:"Joelho", pergunta:"Explique como a articulação do joelho permite movimentos importantes no esporte.", resposta:"Principalmente flexão e extensão." },

{ id:53, tema:"Joelho", pergunta:"Explique por que o joelho é uma articulação vulnerável em esportes.", resposta:"Porque suporta grandes cargas e possui estabilidade dependente de ligamentos." },

{ id:54, tema:"Joelho", pergunta:"Explique o papel do menisco medial na estabilidade do joelho.", resposta:"Ajudar na distribuição de carga e estabilização." },

{ id:55, tema:"Traumas esportivos", pergunta:"Explique por que a lesão do escafoide pode ser difícil de diagnosticar.", resposta:"Porque os sintomas podem ser leves inicialmente e a vascularização é limitada." },

{ id:56, tema:"Traumas esportivos", pergunta:"Explique por que fraturas do escafoide podem evoluir com necrose.", resposta:"Devido à vascularização retrógrada do osso." },

{ id:57, tema:"Sistema esquelético", pergunta:"Explique como o sistema esquelético contribui para produção de movimento.", resposta:"Servindo como ponto de inserção muscular e alavanca." },

{ id:58, tema:"Biomecânica", pergunta:"Explique por que o alinhamento corporal é importante durante exercícios.", resposta:"Para distribuir corretamente as cargas mecânicas." },

{ id:59, tema:"Planos e eixos", pergunta:"Explique a importância do eixo longitudinal para movimentos de rotação.", resposta:"Ele permite movimentos rotacionais no plano transversal." },

{ id:60, tema:"Planos e eixos", pergunta:"Explique a importância do plano sagital para movimentos locomotores.", resposta:"Porque nele ocorrem flexão e extensão." },
{ id:61, tema:"Planos e eixos", pergunta:"Explique por que o plano frontal é importante para movimentos laterais.", resposta:"Porque nele ocorrem abdução e adução." },

{ id:62, tema:"Joelho", pergunta:"Explique por que a estabilidade do joelho depende de várias estruturas.", resposta:"Porque envolve ligamentos, meniscos, cápsula e músculos." },

{ id:63, tema:"Articulações", pergunta:"Explique a função da cartilagem articular durante o movimento.", resposta:"Diminuir atrito e proteger as superfícies ósseas." },

{ id:64, tema:"Sistema esquelético", pergunta:"Explique como o sistema esquelético contribui para a postura.", resposta:"Formando o suporte estrutural do corpo." },

{ id:65, tema:"Coluna vertebral", pergunta:"Explique como as vértebras suportam carga durante exercícios.", resposta:"Distribuindo peso e permitindo mobilidade da coluna." },

{ id:66, tema:"Coluna vertebral", pergunta:"Explique a importância do alinhamento da coluna em exercícios.", resposta:"Para evitar sobrecarga e lesões." },

{ id:67, tema:"Joelho", pergunta:"Explique como os meniscos contribuem para absorção de impacto.", resposta:"Deformando-se e distribuindo forças compressivas." },

{ id:68, tema:"Articulações", pergunta:"Explique a função do líquido sinovial na lubrificação articular.", resposta:"Reduzir atrito durante o movimento." },

{ id:69, tema:"Articulações", pergunta:"Explique por que a cápsula articular é importante para estabilidade.", resposta:"Porque envolve a articulação e mantém os ossos unidos." },

{ id:70, tema:"Articulações", pergunta:"Explique como os ligamentos protegem as articulações.", resposta:"Limitando movimentos excessivos." },

{ id:71, tema:"Articulações", pergunta:"Explique a importância da congruência articular.", resposta:"Melhorar estabilidade e distribuição de forças." },

{ id:72, tema:"Joelho", pergunta:"Explique por que a patela protege a articulação do joelho.", resposta:"Porque protege a região anterior do joelho." },

{ id:73, tema:"Joelho", pergunta:"Explique por que a patela melhora a eficiência do quadríceps.", resposta:"Aumentando o braço de alavanca do tendão." },

{ id:74, tema:"Quadril", pergunta:"Explique como a articulação do quadril contribui para o movimento esportivo.", resposta:"Permitindo movimentos em múltiplos planos." },

{ id:75, tema:"Sistema esquelético", pergunta:"Explique por que o sistema esquelético é essencial para o movimento humano.", resposta:"Porque fornece suporte e alavancas para ação muscular." },

{ id:76, tema:"Sistema esquelético", pergunta:"Explique como os ossos armazenam minerais importantes.", resposta:"Principalmente cálcio e fósforo." },

{ id:77, tema:"Sistema esquelético", pergunta:"Explique como a medula óssea participa da formação de células sanguíneas.", resposta:"Produzindo células sanguíneas no processo de hematopoiese." },

{ id:78, tema:"Sistema esquelético", pergunta:"Explique por que o esqueleto protege órgãos vitais.", resposta:"Porque forma estruturas rígidas ao redor deles." },

{ id:79, tema:"Sistema esquelético", pergunta:"Explique a função estrutural do esqueleto.", resposta:"Dar forma e sustentação ao corpo." },

{ id:80, tema:"Sistema locomotor", pergunta:"Explique como o sistema esquelético atua no sistema locomotor.", resposta:"Em conjunto com músculos e articulações." },

{ id:81, tema:"Joelho", pergunta:"Explique por que o joelho precisa de estabilidade ligamentar.", resposta:"Para suportar cargas e evitar deslocamentos anormais." },

{ id:82, tema:"Joelho", pergunta:"Explique por que lesões ligamentares são comuns em esportes.", resposta:"Porque as articulações são submetidas a forças intensas e mudanças rápidas de direção." },

{ id:83, tema:"Sistema locomotor", pergunta:"Explique a importância do sistema locomotor para atividades físicas.", resposta:"Permitir movimento, postura e deslocamento do corpo." }

];