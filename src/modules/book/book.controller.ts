import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { BookService } from './book.service';
import { CreateBookDto, ReadBookDto, UpdateBookDto } from './dto';

@Controller('book')
export class BookController {
    constructor(private readonly _bookService: BookService) {}

    @Get(':bookId')
    getBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<ReadBookDto> {
        return this._bookService.get(bookId);
    }
    
    @Get('author/:authorId')
    getBookByAuthor(@Param('authorId', ParseIntPipe) authorId: number): Promise<ReadBookDto[]> {
        return this._bookService.getBookByAuthor(authorId);
    }

    @Get()
    getBooks(): Promise<ReadBookDto[]> {
        return this._bookService.getAll();
    }

    @Post()
    @Roles(RoleType.AUTHOR)
    @UseGuards(AuthGuard(), RoleGuard)
    createBook(@Body() book: Partial<CreateBookDto>): Promise<ReadBookDto> {
        return this._bookService.create(book);
    }

    @Post()
    @Roles(RoleType.AUTHOR)
    @UseGuards(AuthGuard(), RoleGuard)
    createBookByAuthor(
        @Body() book: Partial<CreateBookDto>, 
        @GetUser('id') authorId: number
    ): Promise<ReadBookDto> {
        return this._bookService.createByAuthor(book, authorId);
    }

    @Patch(':bookId')
    updateBook(
        @Param('bookId', ParseIntPipe) bookId: number,
        @Body() book: Partial<UpdateBookDto>,
        @GetUser('id') authorId: number
    ): Promise<ReadBookDto> {
        return this._bookService.update(bookId, book, authorId);
    }

    @Delete(':bookId')
    deleteBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<void> {
        return this._bookService.delete(bookId);
    }
}
