/* ==========================================================================
   JAVASCRIPT LOGIC: PORTFOLIO PREMIUM DE MARIANA REGINA FERREIRA
   Features: Floating Navbar, Scroll Reveal, Stacks Filter, IA Lab Simulator,
             Volunteer Collapsibles, Gallery Carrossel, Lightbox & Contact Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. BARRA DE LEITURA E MENU RESPONSIVO
    const progressBar = document.getElementById('progress-bar');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link, .btn-nav');

    // Progresso de Leitura & Navbar flutuante no scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Estilização da navbar flutuante
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle menu sanduíche
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    }

    // Fechar menu ao clicar em links
    navLinkItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== navToggle) {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });


    // 2. SCROLL REVEAL (Efeito de aparecimento dos elementos)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Executa uma vez no início para elementos que já estão na tela
    revealOnScroll();


    // 3. ATUALIZAÇÃO DOURADA DOS BADGES GOOGLE SKILLS
    const btnUpdateBadges = document.getElementById('btn-update-badges');
    const btnUpdateText = document.getElementById('btn-update-text');
    const pointsCountEl = document.getElementById('points-count');
    const updateFeedback = document.getElementById('update-feedback');

    if (btnUpdateBadges) {
        btnUpdateBadges.addEventListener('click', () => {
            btnUpdateBadges.disabled = true;
            btnUpdateText.innerHTML = 'Conectando à API Qwiklabs...';
            updateFeedback.textContent = '';
            updateFeedback.className = 'update-feedback-message';

            // Animação de sincronização simulada
            setTimeout(() => {
                btnUpdateText.innerHTML = 'Sincronizando Badges...';
                
                setTimeout(() => {
                    // Simulação bem sucedida
                    const currentPoints = parseInt(pointsCountEl.textContent, 10);
                    const newPoints = currentPoints + 45; // Simula pontos adicionados
                    pointsCountEl.textContent = newPoints;
                    
                    btnUpdateBadges.disabled = false;
                    btnUpdateText.innerHTML = 'Atualizar Badges';
                    
                    updateFeedback.textContent = 'Sucesso! Perfil atualizado. Foram sincronizados mais 45 pontos e os badges estão atualizados com o Google Cloud.';
                    updateFeedback.classList.add('success');
                }, 1500);

            }, 1200);
        });
    }


    // 4. FILTRO DINÂMICO DE STACK TECNOLÓGICA
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            skillCards.forEach(card => {
                // Suporta múltiplas categorias separadas por espaço: ex "hard dados"
                const cardCategories = card.getAttribute('data-category').split(' ');

                if (category === 'all' || cardCategories.includes(category)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });



    // 5. SIMULADOR DO IA LAB (CHATBOT INTERATIVO)
    const chatbotMessages = document.getElementById('chatbot-messages');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    // Respostas estruturadas
    const responses = {
        'prompt-bi': {
            question: "📊 Como você automatizaria a geração de relatórios de BI na Cushman & Wakefield?",
            answer: "Excelente escolha! Mariana estruturaria esse fluxo usando **Python + SQL + Power BI Service**.<br><br>" +
                    "1️⃣ Primeiramente, criamos uma query SQL otimizada para extrair dados direto da base transacional corporativa.<br>" +
                    "2️⃣ Desenvolvemos um script Python executado em nuvem (ex: Azure Runbook ou AWS Lambda) para ler essa query e fazer o processamento analítico com a biblioteca pandas.<br>" +
                    "3️⃣ O script faz a carga via API oficial do Power BI direto para o Workspace.<br>" +
                    "4️⃣ Configuramos o agendamento de atualização em tempo real para os tomadores de decisão.<br><br>" +
                    "🚀 *Resultado:* Relatórios atualizados automaticamente sem intervenção manual de digitação de planilhas!"
        },
        'prompt-chamados': {
            question: "🛠️ Como integrar IA na triagem de chamados técnicos (Supabase + OpenRouter)?",
            answer: "Incrível! No projeto **Sistema de Chamados Técnicos**, a Mariana aplicou inteligência na triagem utilizando o seguinte fluxo:<br><br>" +
                    "🤖 O cliente descreve o problema no frontend (ex: 'Minha impressora parou de funcionar na rede').<br>" +
                    "⚙️ Uma função API envia a descrição para um modelo LLM (como o Gemini via **OpenRouter**) contendo instruções estritas (System Instructions) para categorizar o ticket.<br>" +
                    "📥 O LLM retorna a categoria ('Hardware') e o nível de prioridade ('Alta') formatados em JSON válido.<br>" +
                    "💾 O backend salva esses dados diretamente nas tabelas relacionais do **Supabase** e notifica o time responsável.<br><br>" +
                    "✨ *Resultado:* Tempo de resposta operacional reduzido drasticamente por meio de automação cognitiva."
        },
        'prompt-agent': {
            question: "🤖 Simule a execução passo a passo de um AI Agent no financeiro.",
            answer: "Aqui está o rastreamento em tempo real de execução de um **Agente de IA** autônomo baseado no Microsoft AI Foundry:<br><br>" +
                    "📥 **[INPUT DO SISTEMA]**: 'Verifique pendências financeiras do Santander no Databricks e avise o setor por e-mail.'<br>" +
                    "🧠 **[PLANEJAMENTO]**: O Agente identifica a necessidade de acessar duas ferramentas (Tool Calling): Consultas de Banco e Sistema de Correio.<br>" +
                    "⚡ **[AÇÃO 1]**: Executa script SQL via conector Databricks. *Resultado: 3 faturas encontradas com status pendente.*<br>" +
                    "⚡ **[AÇÃO 2]**: O Agente redige uma tabela Markdown resumindo as pendências e aciona a API de envio de E-mail.<br>" +
                    "✅ **[AUTOMAÇÃO COMPLETA]**: E-mail enviado com sucesso para o financeiro.<br><br>" +
                    "🕒 *Tempo de Execução:* **1.4 segundos**."
        }
    };

    const appendMessage = (text, sender) => {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message', sender);
        messageEl.innerHTML = text;
        chatbotMessages.appendChild(messageEl);
        
        // Scroll automático para a última mensagem
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const simulateTyping = (callback) => {
        const typingEl = document.createElement('div');
        typingEl.classList.add('message', 'incoming', 'message-typing');
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingEl);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        setTimeout(() => {
            typingEl.remove();
            callback();
        }, 1500);
    };

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const promptKey = btn.getAttribute('data-prompt');
            const data = responses[promptKey];
            
            if (data) {
                // Desabilitar botões temporariamente durante simulação
                presetButtons.forEach(p => p.disabled = true);
                
                // Enviar mensagem do usuário
                appendMessage(data.question, 'outgoing');

                // Simular digitação e enviar resposta da IA
                simulateTyping(() => {
                    appendMessage(data.answer, 'incoming');
                    presetButtons.forEach(p => p.disabled = false);
                });
            }
        });
    });


    // 6. PAINÉIS COLAPSÁVEIS DE VOLUNTARIADO
    const collapsibleButtons = document.querySelectorAll('.collapsible-btn');

    collapsibleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);

            const contentId = button.id.replace('-btn', '-content');
            const content = document.getElementById(contentId);

            if (content) {
                content.classList.toggle('show');
            }
        });
    });


    // 7. CARROSSEL DE IMAGENS DO VOLUNTARIADO
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const slides = document.querySelectorAll('.carousel-slide');

    let currentSlideIndex = 0;
    
    // Configura layout dinâmico das imagens com base na largura da tela
    const getVisibleSlides = () => {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 1024) return 2;
        return 4;
    };

    const updateCarouselPosition = () => {
        if (!track || slides.length === 0) return;
        
        const visibleSlides = getVisibleSlides();
        const maxIndex = slides.length - visibleSlides;
        
        if (currentSlideIndex > maxIndex) {
            currentSlideIndex = maxIndex;
        }
        if (currentSlideIndex < 0) {
            currentSlideIndex = 0;
        }

        // Calcula offset baseado no tamanho do container
        const trackWidth = track.parentElement.getBoundingClientRect().width;
        const slideGap = 20; // Correspondente a 1.25rem do gap
        const slideWidth = (trackWidth - (slideGap * (visibleSlides - 1))) / visibleSlides;
        
        const offset = currentSlideIndex * (slideWidth + slideGap);
        track.style.transform = `translateX(-${offset}px)`;
    };

    if (nextBtn && prevBtn && track) {
        nextBtn.addEventListener('click', () => {
            const visibleSlides = getVisibleSlides();
            const maxIndex = slides.length - visibleSlides;
            if (currentSlideIndex < maxIndex) {
                currentSlideIndex++;
                updateCarouselPosition();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateCarouselPosition();
            }
        });

        // Recalcular no resize
        window.addEventListener('resize', updateCarouselPosition);
        
        // Carregamento inicial do carrossel
        setTimeout(updateCarouselPosition, 100);
    }


    // 8. GALERIA LIGHTBOX COM NAVEGAÇÃO COMPLETA
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');

    let currentImageIndex = 0;
    const galleryImages = [];

    // Mapear todas as imagens do carrossel para navegação do lightbox
    slides.forEach((slide, idx) => {
        const img = slide.querySelector('img');
        if (img) {
            galleryImages.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt')
            });

            // Clique para abrir no Lightbox
            slide.addEventListener('click', () => {
                currentImageIndex = idx;
                openLightbox();
            });
        }
    });

    const openLightbox = () => {
        if (!lightbox || galleryImages.length === 0) return;
        const image = galleryImages[currentImageIndex];
        
        lightboxImg.setAttribute('src', image.src);
        lightboxImg.setAttribute('alt', image.alt);
        lightboxCaption.textContent = image.alt;
        lightbox.style.display = 'flex';
        
        // Desabilitar scroll do body
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Fechar ao clicar fora da imagem
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    const showNextImage = () => {
        if (galleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openLightbox();
    };

    const showPrevImage = () => {
        if (galleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox();
    };

    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });

    // Atalhos do teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });



    // 9. FORMULÁRIO DE CONTATO — ENVIO DIRETO VIA GMAIL (ZERO CONFIGURAÇÃO)
    // Quando a pessoa clicar em "Enviar", o Gmail abre com tudo preenchido.
    // Ela só clica em "Enviar" dentro do Gmail → e-mail chega direto na Mariana.
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback-message');
    const btnSubmitContact = document.getElementById('btn-submit-contact');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('form-name').value.trim();
            const email   = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            // Validação básica
            if (!name || !email || !subject || !message) {
                formFeedback.textContent = '⚠️ Por favor, preencha todos os campos.';
                formFeedback.className = 'form-feedback-status error';
                return;
            }

            // Monta o corpo do e-mail com os dados do formulário
            const emailBody = 
                `Olá, Mariana!\n\n` +
                `Meu nome é ${name} e entrei em contato pelo seu portfólio.\n\n` +
                `📧 Meu e-mail para retorno: ${email}\n` +
                `📌 Assunto: ${subject}\n\n` +
                `💬 Mensagem:\n${message}\n\n` +
                `---\nEnviado pelo portfólio de Mariana Regina Ferreira.`;

            // Abre o Gmail com tudo preenchido (funciona no navegador, sem instalar nada)
            const gmailUrl = `https://mail.google.com/mail/?view=cm`
                + `&to=${encodeURIComponent('mari.ferreira2061808@gmail.com')}`
                + `&su=${encodeURIComponent('[Portfólio] ' + subject)}`
                + `&body=${encodeURIComponent(emailBody)}`;

            window.open(gmailUrl, '_blank');

            // Feedback visual de sucesso
            contactForm.reset();
            formFeedback.textContent = '✅ O Gmail foi aberto com a mensagem pronta! É só clicar em "Enviar" lá.';
            formFeedback.classList.add('success');

            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback-status';
            }, 7000);
        });
    }

});


